import { ContactSubmissionConfirmationEmail } from '@/emails/contact-submission-confirmation';
import { siteConfig } from '@/lib/config/site';
import { resend, isResendConfigured } from '@/lib/resend';
import { contactSubmissionSchema } from '@/lib/validations/contact-submission';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const SENDER_EMAIL = siteConfig.email;
const NOREPLY_EMAIL = 'noreply@ryzenstudio.com';

// Rate limiting configuration (in-memory, use Redis for production at scale)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

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

export async function POST(request: Request) {
  // Get client IP for rate limiting
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const clientIp = forwardedFor?.split(',')[0]?.trim() || 'unknown';

  // Check rate limit
  if (!checkRateLimit(clientIp)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  // Validate origin (basic CSRF protection)
  const origin = headersList.get('origin');
  const allowedOrigins = [
    'https://ryzenstudio.com',
    'https://www.ryzenstudio.com',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null,
  ].filter(Boolean);

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: 'Invalid request origin' },
      { status: 403 }
    );
  }

  if (!isResendConfigured) {
    return NextResponse.json(
      { error: 'Email service is not configured' },
      { status: 503 }
    );
  }

  try {
    const data = await request.json();
    const parsedData = contactSubmissionSchema.safeParse(data);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your input.' },
        { status: 400 }
      );
    }

    const { name, email, message } = parsedData.data;

    // Sanitize input (basic XSS prevention)
    const sanitizedName = name.trim().slice(0, 100);
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 254);
    const sanitizedMessage = message.trim().slice(0, 5000);

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
