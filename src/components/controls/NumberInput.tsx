import { cn } from '../../lib/utils';

interface NumberInputProps {
  label?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  className?: string;
}

export function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  suffix,
  className,
}: NumberInputProps) {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <span className="t-eyebrow">{label}</span>}
      <div className="flex h-9 items-stretch overflow-hidden rounded-md border border-[var(--border-default)] bg-white focus-within:border-[var(--border-focus)] focus-within:shadow-[0_0_0_3px_rgba(91,91,214,0.15)]">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          className="flex w-9 items-center justify-center text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Decrease"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex flex-1 items-center justify-center border-x border-[var(--border-default)] bg-white text-[13.5px] font-medium text-[var(--text-primary)] tabular-nums">
          {value}
          {suffix && <span className="ml-0.5 text-[var(--text-tertiary)]">{suffix}</span>}
        </div>
        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          className="flex w-9 items-center justify-center text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Increase"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 3v6M3 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}