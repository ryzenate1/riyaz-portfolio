import { type contactSubmissionSchema } from '@/lib/validations/contact-submission';
import { type z } from 'zod';

type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

function sendEmail(contactData: ContactSubmission) {
  return fetch('/api/email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });
}

export { sendEmail };
