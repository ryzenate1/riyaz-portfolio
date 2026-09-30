'use client';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/lib/config/site';

const GMAIL_COMPOSE_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=riyazakthar46@gmail.com';

function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(GMAIL_COMPOSE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(GMAIL_COMPOSE_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={handleSubmit}>
        <fieldset className="group flex flex-col gap-y-6">
          <legend className="sr-only">Contact information</legend>
          <div>
            <Label htmlFor="contact-form-name">Name</Label>
            <Input
              id="contact-form-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="contact-form-email">Email</Label>
            <Input
              id="contact-form-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label
              htmlFor="contact-form-message"
              className="flex items-center justify-between"
            >
              <span>What&apos;s up!</span>
              <span id="contact-form-message-hint" className="text-neutrals-400 capitalize">Max 1800 characters</span>
            </Label>
            <Textarea
              id="contact-form-message"
              name="message"
              aria-describedby="contact-form-message-hint"
              required
              maxLength={1800}
              placeholder="Tell us about your project..."
            />
          </div>
          <div className="flex max-sm:flex-col-reverse max-sm:gap-y-6 sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleEmailClick}
              className="text-neutrals-300 hover:text-neutrals-50 focus-visible:text-neutrals-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary inline-flex min-h-11 items-center transition-colors cursor-pointer"
              title={`Email us at ${siteConfig.email}`}
            >
              <Icons.Envelope
                aria-hidden="true"
                className="me-2 inline size-5"
              />
              {siteConfig.email}
            </button>
            <Button
              type="submit"
              className="max-sm:w-full"
            >
              Hit us up
              <Icons.Rocket
                aria-hidden
                className="ms-2 inline size-5"
              />
            </Button>
          </div>
        </fieldset>
      </form>
  );
}

export { ContactForm };
