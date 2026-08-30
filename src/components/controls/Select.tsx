import { cn } from '../../lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  className?: string;
  placeholder?: string;
}

export function Select({ label, value, onChange, options, className, placeholder }: SelectProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <span className="t-eyebrow">{label}</span>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-full appearance-none rounded-md border border-[var(--border-default)] bg-white px-3 pr-9 text-[13.5px] font-medium text-[var(--text-primary)] transition-colors focus-ring"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
          width="12" height="12" viewBox="0 0 12 12" fill="none"
        >
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}