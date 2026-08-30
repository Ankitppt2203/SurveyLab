import { cn } from '../../lib/utils';

interface TextInputProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  type?: 'text' | 'url';
  className?: string;
  inputClassName?: string;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  type = 'text',
  className,
  inputClassName,
}: TextInputProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && <span className="t-eyebrow">{label}</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cn(
          'h-9 w-full rounded-md border border-[var(--border-default)] bg-white px-3 text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] transition-colors focus-ring',
          inputClassName,
        )}
      />
    </div>
  );
}