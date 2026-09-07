import { cn } from '../../lib/utils';

interface OptionRowProps {
  index: number;
  value: string;
  onChange: (v: string) => void;
  onDelete?: () => void;
  canDelete: boolean;
  accentColor: string;
}

export function OptionRow({ index, value, onChange, onDelete, canDelete, accentColor }: OptionRowProps) {
  return (
    <div className="group flex items-center gap-1.5 sm:gap-2">
      <span className="flex h-9 w-7 flex-shrink-0 items-center justify-center rounded-md border border-[var(--border-default)] bg-white text-[11px] font-medium text-[var(--text-tertiary)] tabular-nums sm:w-7">
        {index + 1}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Option ${index + 1}`}
        className="h-9 min-w-0 flex-1 rounded-md border border-[var(--border-default)] bg-white px-3 text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] transition-colors focus-ring"
      />
      <button
        type="button"
        onClick={onDelete}
        disabled={!canDelete}
        className={cn(
          'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-transparent text-[var(--danger)] transition-all',
          canDelete
            ? 'hover:border-[var(--border-default)] hover:bg-[var(--bg-hover)] hover:text-red-600'
            : 'cursor-not-allowed opacity-30',
        )}
        aria-label="Delete option"
        title={canDelete ? 'Remove option' : 'At least 2 options are required'}
      >
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
          <path d="M3.5 5h7M5.5 5V3.5h3V5M4.5 5l.5 6h4l.5-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
