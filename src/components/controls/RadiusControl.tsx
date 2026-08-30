import type { CornerRadii } from '../../types';
import { NumberInput } from './NumberInput';

interface RadiusControlProps {
  label: string;
  value: CornerRadii;
  onChange: (next: CornerRadii) => void;
  min?: number;
  max?: number;
}

export function RadiusControl({ label, value, onChange, min = 0, max = 64 }: RadiusControlProps) {
  return (
    <div className="space-y-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-4">
      <span className="t-h3">{label}</span>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <NumberInput label="TL" value={value.topLeft} onChange={(topLeft) => onChange({ ...value, topLeft })} min={min} max={max} />
        <NumberInput label="TR" value={value.topRight} onChange={(topRight) => onChange({ ...value, topRight })} min={min} max={max} />
        <NumberInput label="BR" value={value.bottomRight} onChange={(bottomRight) => onChange({ ...value, bottomRight })} min={min} max={max} />
        <NumberInput label="BL" value={value.bottomLeft} onChange={(bottomLeft) => onChange({ ...value, bottomLeft })} min={min} max={max} />
      </div>
    </div>
  );
}
