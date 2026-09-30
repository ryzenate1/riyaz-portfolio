import { ContactSubmissionConfirmationEmail } from '@/emails/contact-submission-confirmation';
import { siteConfig } from '@/lib/config/site';
import { resend, isResendConfigured } from '@/lib/resend';
import { contactSubmissionSchema } from '@/lib/validations/contact-submission';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const SENDER_EMAIL = siteConfig.email;
const NOREPLY_EMAIL = 'noreply@ryzenstudio.com';

// Rate limiting configuration (in-memory, use Redis for production at scale)
// NOTE: in-memory map only works per-instance; on serverless (Vercel) each
// isolate has its own map, so this is best-effort abuse dampening, not a
// distributed guarantee. Entries are pruned opportunistically to bound memory.
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute
const MAX_BODY_BYTES = 20 * 1024; // 20KB — contact payloads are tiny

function pruneRateLimit(now: number) {
  for (const [ip, record] of rateLimit) {
    if (now > record.resetTime) rateLimit.delete(ip);
  }
  // Hard bound: drop oldest entries if map grows abnormally (e.g. IP spoofing)
  if (rateLimit.size > 1000) {
    const oldest = [...rateLimit.keys()].slice(0, rateLimit.size - 1000);
    for (const key of oldest) rateLimit.delete(key);
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

function safeParseOrigin(referer: string): string | null {
  try {
    const url = new URL(referer);
    return url.origin;
  } catch {
    return null;
  }
}

function safeParseHost(origin: string): string | null {
  try {
    return new URL(origin).host;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  // Get client IP for rate limiting
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const clientIp = forwardedFor?.split(',')[0]?.trim() || 'unknown';

  // Check rate limit
  pruneRateLimit(Date.now());
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  // Reject oversized bodies before parsing (basic DoS guard)
  const contentLength = headersList.get('content-length');
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: 'Payload too large.' },
      { status: 413 }
    );
  }

  // Validate origin (basic CSRF protection).
  // Browsers send Origin on fetch/POST forms; older clients may send only
  // Referer. If neither is present (curl, server-to-server) there is no
  // ambient-credential CSRF vector, so we allow. Same-host origins (e.g.
  // Vercel preview deployments) are accepted via host comparison.
  const origin = headersList.get('origin');
  const referer = headersList.get('referer');
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host');
  const allowedOrigins = [
    'https://ryzenstudio.com',
    'https://www.ryzenstudio.com',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
  ].filter((o): o is string => Boolean(o));

  const candidate = origin ?? (referer ? safeParseOrigin(referer) : null);
  if (candidate) {
    const isAllowed =
      allowedOrigins.includes(candidate) ||
      (host !== null && safeParseHost(candidate) === host);
    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      );
    }
  }

  if (!isResendConfigured) {
    return NextResponse.json(
      { error: 'Email service is not configured' },
      { status: 503 }
    );
  }

  try {
    let data: unknown;
    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your input.' },
        { status: 400 }
      );
    }
    const parsedData = contactSubmissionSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your input.' },
        { status: 400 }
      );
    }

    const { name, email, message } = parsedData.data;

    // Sanitize input (defense-in-depth; limits mirror the zod schema).
    // Strip CR/LF to prevent email header injection via subject/replyTo.
    const stripNewlines = (v: string) => v.replace(/[\r\n]+/g, ' ').trim();
    const sanitizedName = stripNewlines(name).slice(0, 60);
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 254);
    const sanitizedMessage = message.trim().slice(0, 1800);

    await resend.emails.send({
      from: `Noreply RYZEN STUDIO <${NOREPLY_EMAIL}>`,
      to: SENDER_EMAIL,
      replyTo: sanitizedEmail,
      subject: `${sanitizedName} ― RYZEN STUDIO Inquiry`,
      text: sanitizedMessage,
    });

    await resend.emails.send({
      from: `Noreply RYZEN STUDIO <${NOREPLY_EMAIL}>`,
      to: sanitizedEmail,
      subject: `Thanks for getting in touch ${sanitizedName}!`,
      react: ContactSubmissionConfirmationEmail({ 
        name: sanitizedName, 
        email: sanitizedEmail, 
        message: sanitizedMessage 
      }),
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    // Log error securely server-side only
    if (process.env.NODE_ENV === 'development') {
      console.error('Email API Error:', error);
    }
    // Return generic error message to client (never expose internal details)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
