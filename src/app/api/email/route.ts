import { ContactSubmissionConfirmationEmail } from '@/emails/contact-submission-confirmation';
import { siteConfig } from '@/lib/config/site';
import { resend, isResendConfigured } from '@/lib/resend';
import { contactSubmissionSchema } from '@/lib/validations/contact-submission';
import { NextResponse } from 'next/server';

const SENDER_EMAIL = siteConfig.email;
const NOREPLY_EMAIL = 'noreply@ryzenstudio.com';

export async function POST(request: Request) {
  if (!isResendConfigured) {
    return NextResponse.json(
      { error: 'Email service is not configured' },
      { status: 503 }
    );
  }

  const data = await request.json();
  const parsedData = contactSubmissionSchema.safeParse(data);

  if (!parsedData.success) {
    const { issues } = parsedData.error;
    return NextResponse.json(issues, { status: 400 });
  }

  const { name, email, message } = parsedData.data;

  try {
    await resend.emails.send({
      from: `Noreply RYZEN STUDIO <${NOREPLY_EMAIL}>`,
      to: SENDER_EMAIL,
      replyTo: email,
      subject: `${name} ― RYZEN STUDIO Inquiry`,
      text: message,
    });

    await resend.emails.send({
      from: `Noreply RYZEN STUDIO <${NOREPLY_EMAIL}>`,
      to: email,
      subject: `Thanks for getting in touch ${name}!`,
      react: ContactSubmissionConfirmationEmail({ name, email, message }),
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
