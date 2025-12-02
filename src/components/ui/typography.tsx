import { cn } from '@/lib/utils';
import { type ComponentProps } from 'react';

function Heading({ children, className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      className={cn(
        'text-neutrals-50 mb-4 font-bold text-balance tracking-tight',
        // Fluid font sizing: min 1.875rem (30px), preferred 5vw, max 3rem (48px)
        'text-[clamp(1.875rem,4vw+0.5rem,3rem)] leading-[1.1]',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

// Two-tone heading like GitHub (first part white, highlighted part gradient)
function TwoToneHeading({ 
  children, 
  highlight,
  className, 
  ...props 
}: ComponentProps<'h2'> & { highlight?: string }) {
  return (
    <h2
      className={cn(
        'mb-4 font-bold text-balance tracking-tight',
        'text-[clamp(1.875rem,4vw+0.5rem,3rem)] leading-[1.1]',
        className,
      )}
      {...props}
    >
      <span className="text-neutrals-50">{children}</span>
      {highlight && (
        <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
          {' '}{highlight}
        </span>
      )}
    </h2>
  );
}

// Large hero-style heading with gradient
function GradientHeading({ children, className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'font-extrabold tracking-tighter text-balance',
        'text-[clamp(2.5rem,8vw+1rem,5rem)] leading-[1.05]',
        'bg-gradient-to-b from-neutrals-50 via-neutrals-100 to-neutrals-400 bg-clip-text text-transparent',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function Caption({ children, className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'border-primary/30 bg-primary/10 text-primary after:animate-shiny-badge-slide after:bg-primary/10 relative mb-4 inline-block overflow-hidden rounded-full border-[0.5px] px-4 py-1 font-medium text-pretty uppercase backdrop-blur-sm text-shadow-lg after:absolute after:inset-0 max-md:text-sm',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

function Paragraph({ children, className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-neutrals-300 max-w-prose text-base/relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export { Caption, Heading, TwoToneHeading, GradientHeading, Paragraph };
