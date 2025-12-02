'use client';

import { useState } from 'react';
import { CopyrightText } from '@/components/layout/copyright-text';
import { Container } from '@/components/ui/container';
import { Icons } from '@/components/ui/icons';
import { siteConfig } from '@/lib/config/site';
import { UnderConstructionDialog } from '@/components/ui/under-construction-dialog';
import Link from 'next/link';

const primaryLinks = [
  {
    label: 'About',
    href: '/#about',
  },
  {
    label: 'Work',
    href: '/#work',
  },
  {
    label: 'Customer Stories',
    href: '/#stories',
  },
  {
    label: 'Services',
    href: '/#services',
  },
  {
    label: 'Games',
    href: '/games',
  },
  {
    label: 'Contact',
    href: '/#contact',
  },
] as const;

const secondaryLinks = [
  {
    label: 'Imprint',
    href: '/imprint',
  },
] as const;

const socials = [
  {
    label: 'View GitHub profile',
    href: siteConfig.links.github,
    icon: Icons.GitHub,
    isUnderConstruction: true,
  },
  {
    label: 'View Instagram profile',
    href: siteConfig.links.instagram,
    icon: Icons.Instagram,
    isUnderConstruction: false,
  },
  {
    label: 'View LinkedIn profile',
    href: siteConfig.links.linkedin,
    icon: Icons.LinkedIn,
    isUnderConstruction: true,
  },
] as const;

export default function Footer() {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');

  const handleUnderConstruction = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    const platformName = label.replace('View ', '').replace(' profile', '');
    setDialogTitle(`🚧 ${platformName} Link Coming Soon`);
    setShowDialog(true);
  };

  return (
    <>
      <UnderConstructionDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        title={dialogTitle}
        message="We regret the inconvenience! This link is being set up. Please connect with us through these alternative platforms:"
      />
      
      <footer
        aria-label="Primary"
        className="border-neutrals-600 bg-neutrals-900 relative z-10 w-full border-t-[0.5px] py-3"
      >
      <Container>
        <nav
          aria-label="Primary"
          className="flex flex-wrap justify-center gap-6 py-12"
        >
          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-neutrals-300 hover:text-neutrals-50 focus-visible:text-neutrals-50 text-sm uppercase transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <hr className="via-neutrals-600 h-px border-0 bg-gradient-to-r from-transparent to-transparent" />
        <div className="grid grid-cols-1 items-center justify-center gap-6 py-12 lg:grid-cols-3">
          <nav
            aria-label="Secondary"
            className="flex flex-wrap justify-center gap-6 lg:order-last lg:justify-end"
          >
            {secondaryLinks.map((link) => (
              <Link
                key={link.label}
                className="text-neutrals-300 hover:text-neutrals-50 focus-visible:text-neutrals-50 text-xs uppercase transition-colors"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ul
            aria-label="Socials"
            className="flex flex-wrap justify-center gap-2"
          >
            {socials.map(({ label, href, icon: Icon, isUnderConstruction }) => (
              <li key={label}>
                <a
                  href={href}
                  title={isUnderConstruction ? `${label} (Coming Soon)` : label}
                  aria-label={label}
                  rel="noreferrer"
                  target={isUnderConstruction ? undefined : "_blank"}
                  onClick={isUnderConstruction ? (e) => handleUnderConstruction(e, label) : undefined}
                  className="text-neutrals-300 hover:text-neutrals-50 focus-visible:text-neutrals-50 transition-colors cursor-pointer"
                >
                  <Icon
                    aria-hidden
                    className="size-7"
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex justify-center lg:order-first lg:justify-start">
            <CopyrightText />
          </div>
        </div>
      </Container>
    </footer>
    </>
  );
}
