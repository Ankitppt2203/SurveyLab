import { cn } from '../../lib/utils';

interface RangeSliderProps {
  label?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  className?: string;
}

export function RangeSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  className,
}: RangeSliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {(label || unit) && (
        <div className="flex items-center justify-between">
          {label && <span className="t-eyebrow">{label}</span>}
          {unit && (
            <span className="text-[12px] font-medium text-[var(--text-secondary)] tabular-nums">
              {value}
              {unit}
            </span>
          )}
        </div>
      )}
      <div className="relative h-6 flex items-center">
        <div className="absolute inset-x-0 h-1 rounded-full bg-[var(--border-default)]" />
        <div
          className="absolute h-1 rounded-full bg-[var(--accent)]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative z-10 h-6 w-full appearance-none bg-transparent slider-thumb"
        />
      </div>
      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 16px; height: 16px;
          background: #fff;
          border: 1px solid var(--border-default);
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.12);
          cursor: pointer;
        }
        .slider-thumb::-moz-range-thumb {
          width: 16px; height: 16px;
          background: #fff;
          border: 1px solid var(--border-default);
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.12);
          cursor: pointer;
        }
        .slider-thumb::-webkit-slider-runnable-track { background: transparent; height: 16px; }
        .slider-thumb::-moz-range-track { background: transparent; height: 16px; }
      `}</style>
    </div>
  );
}