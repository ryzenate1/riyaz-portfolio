'use client';

import { CopyrightText } from '@/components/layout/copyright-text';
import { Container } from '@/components/ui/container';
import { Icons } from '@/components/ui/icons';
import { siteConfig } from '@/lib/config/site';
import Link from 'next/link';

const primaryLinks = [
  {
    label: 'About',
    href: '/pro#about',
  },
  {
    label: 'Work',
    href: '/pro#work',
  },
  {
    label: 'Games',
    href: '/games',
  },
  {
    label: 'Contact',
    href: '/pro#contact',
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
  },
  {
    label: 'View Instagram profile',
    href: siteConfig.links.instagram,
    icon: Icons.Instagram,
  },
  {
    label: 'View LinkedIn profile',
    href: siteConfig.links.linkedin,
    icon: Icons.LinkedIn,
  },
] as const;

export default function Footer() {
  return (
    <footer
        aria-label="Footer"
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
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  title={label}
                  aria-label={label}
                  rel="noreferrer"
                  target="_blank"
                  className="text-neutrals-300 hover:text-neutrals-50 focus-visible:text-neutrals-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors cursor-pointer inline-flex min-h-11 min-w-11 items-center justify-center p-2"
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
  );
}
