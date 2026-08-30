import { useRef, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  presets?: string[];
  className?: string;
}

const DEFAULT_PRESETS = ['#5B5BD6', '#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#0F172A', '#FFFFFF'];

export function ColorPicker({ label, value, onChange, presets = DEFAULT_PRESETS, className }: ColorPickerProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [hex, setHex] = useState(value);

  useEffect(() => { setHex(value); }, [value]);

  const commit = (v: string) => {
    let next = v.trim();
    if (next && !next.startsWith('#')) next = '#' + next;
    if (/^#[0-9a-fA-F]{6}$/.test(next) || /^#[0-9a-fA-F]{3}$/.test(next)) {
      onChange(next);
    } else {
      setHex(value);
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && <span className="t-eyebrow">{label}</span>}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-md border border-[var(--border-default)] bg-white shadow-[var(--shadow-xs)] transition-shadow hover:shadow-[var(--shadow-sm)]"
          aria-label="Pick color"
        >
          <span
            className="absolute inset-1 rounded-[5px]"
            style={{ background: value }}
          />
        </button>
        <input
          ref={ref}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          tabIndex={-1}
        />
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          onBlur={() => commit(hex)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
              commit(hex);
            }
          }}
          className="h-9 w-full rounded-md border border-[var(--border-default)] bg-white px-3 text-[13px] font-medium text-[var(--text-primary)] uppercase tracking-wide focus-ring"
          maxLength={7}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset) => {
          const active = preset.toLowerCase() === value.toLowerCase();
          return (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className={cn(
                'h-6 w-6 rounded-md border transition-all',
                active
                  ? 'border-[var(--text-primary)] scale-110'
                  : 'border-[var(--border-default)] hover:scale-105',
              )}
              style={{ background: preset }}
              aria-label={`Use ${preset}`}
            />
          );
        })}
      </div>
    </div>
  );
}