import { cn } from '../../lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

export function Toggle({ checked, onChange, label, description, className }: ToggleProps) {
  return (
    <label className={cn('flex cursor-pointer items-start justify-between gap-3', className)}>
      {(label || description) && (
        <div className="min-w-0 flex-1 flex-col">
          {label && <span className="t-h3 block leading-tight">{label}</span>}
          {description && <span className="t-small mt-0.5 block leading-snug">{description}</span>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={(e) => {
          e.preventDefault();
          onChange(!checked);
        }}
        className={cn(
          'relative h-[22px] w-9 flex-shrink-0 rounded-full transition-colors',
          checked ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]',
        )}
      >
        <span
          className={cn(
            'absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform',
            checked ? 'translate-x-[18px]' : 'translate-x-[2px]',
          )}
        />
      </button>
    </label>
  );
}