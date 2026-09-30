'use client';

import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useScrollThreshold } from '@/hooks/use-scroll-threshold';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const links = [
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
] as const;

function Header() {
  const { isScrollThresholdPassed } = useScrollThreshold();

  const isBackgroundShown = isScrollThresholdPassed;

  return (
    <header
      className="fixed top-0 z-40 w-full"
    >
      <Container>
        <div
          className={cn(
            'mt-4 rounded-full border-[0.5px] p-2 transition-colors duration-500',
            isBackgroundShown
              ? 'border-neutrals-50/20 bg-neutrals-900/60 shadow-[inset_0_1px_1px_0_rgb(255_254_249/0.3)] backdrop-blur-sm'
              : 'border-transparent bg-transparent',
          )}
        >
          <div className="grid grid-cols-3">
            <div className="flex items-center lg:hidden">
              <MobileNavigation
                links={links}
                className="lg:hidden"
              />
            </div>
            <nav
              aria-label="Primary"
              className="ms-4 hidden items-center gap-x-6 lg:flex"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-neutrals-50 after:via-neutrals-200 relative flex h-full items-center p-1 text-sm uppercase after:absolute after:inset-x-0 after:bottom-[12.25%] after:h-px after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:to-transparent after:transition-transform hover:after:-scale-x-100 focus-visible:after:-scale-x-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-center">
              <Link
                href="/"
                title="Navigate home"
                className="text-neutrals-50 hover:text-white transition-colors duration-200 flex items-baseline gap-1"
              >
                <span className="font-bold text-lg md:text-xl tracking-wider font-mono uppercase">
                  RYZEN
                </span>
                <span className="font-mono text-lg md:text-xl tracking-wider uppercase">
                  STUDIO
                </span>
              </Link>
            </div>
            <div className="flex items-center justify-end">
              <Button
                asChild
                size="small"
                isGhost
                className="rounded-full"
              >
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=riyazakthar46@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hit us up
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export { Header };
