import { env } from '@/t3-env';
import { Resend } from 'resend';

const apiKey = env.RESEND_API_KEY || 'placeholder';
const resend = new Resend(apiKey);

export const isResendConfigured = Boolean(env.RESEND_API_KEY);
export { resend };
