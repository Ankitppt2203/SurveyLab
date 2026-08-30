import { useState, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  badge?: ReactNode;
}

export function Section({
  title,
  description,
  defaultOpen = true,
  children,
  className,
  contentClassName,
  badge,
}: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className={cn('rounded-xl border border-[var(--border-default)] bg-white shadow-[var(--shadow-xs)]', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-2.5 px-4 py-3.5 text-left sm:gap-3 sm:px-5 sm:py-4"
        aria-expanded={open}
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-w-0 items-center gap-2">
            <h3 className="t-h2 truncate">{title}</h3>
            {badge}
          </div>
          {description && <p className="t-small mt-0.5 line-clamp-2">{description}</p>}
        </div>
        <span
          className={cn(
            'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-transparent text-[var(--text-tertiary)] transition-all',
            open ? 'rotate-180' : 'rotate-0',
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className={cn('px-4 pb-5 pt-1 sm:px-5', contentClassName)}>{children}</div>
      )}
    </section>
  );
}