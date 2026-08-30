import type { BoxEdges } from '../../types';
import { NumberInput } from './NumberInput';

interface SpacingControlProps {
  label: string;
  value: BoxEdges;
  onChange: (next: BoxEdges) => void;
  min?: number;
  max?: number;
}

export function SpacingControl({ label, value, onChange, min = 0, max = 64 }: SpacingControlProps) {
  return (
    <div className="space-y-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-4">
      <span className="t-h3">{label}</span>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <NumberInput label="Top" value={value.top} onChange={(top) => onChange({ ...value, top })} min={min} max={max} />
        <NumberInput label="Right" value={value.right} onChange={(right) => onChange({ ...value, right })} min={min} max={max} />
        <NumberInput label="Bottom" value={value.bottom} onChange={(bottom) => onChange({ ...value, bottom })} min={min} max={max} />
        <NumberInput label="Left" value={value.left} onChange={(left) => onChange({ ...value, left })} min={min} max={max} />
      </div>
    </div>
  );
}
