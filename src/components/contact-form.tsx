'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// Typography imports removed - not needed for under construction mode
import { siteConfig } from '@/lib/config/site';
import { UnderConstructionDialog } from '@/components/ui/under-construction-dialog';

function ContactForm() {
  const [showDialog, setShowDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDialog(true);
  };

  return (
    <>
      <UnderConstructionDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title="🚧 Contact Form Under Construction"
        message="Our contact form is being upgraded for a better experience. Please reach out through these platforms instead:"
      />
      
      <form onSubmit={handleSubmit}>
        <fieldset className="group flex flex-col gap-y-6">
          <div>
            <Label htmlFor="contact-form-name">Name</Label>
            <Input
              id="contact-form-name"
              type="text"
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="contact-form-email">Email</Label>
            <Input
              id="contact-form-email"
              type="email"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label
              htmlFor="contact-form-message"
              className="flex items-center justify-between"
            >
              <span>What&apos;s up!</span>
              <span className="text-neutrals-500 capitalize">Max 1800 characters</span>
            </Label>
            <Textarea
              id="contact-form-message"
              placeholder="Tell us about your project..."
            />
          </div>
          <div className="flex max-sm:flex-col-reverse max-sm:gap-y-6 sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleEmailClick}
              className="text-neutrals-300 hover:text-neutrals-50 focus-visible:text-neutrals-50 inline-flex items-center transition-colors cursor-pointer"
              title="Hit us up"
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
    </>
  );
}

export { ContactForm };
