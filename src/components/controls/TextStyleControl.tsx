import type { TextStyleConfig } from '../../types';
import { ColorPicker } from './ColorPicker';
import { Select } from './Select';
import { RangeSlider } from './RangeSlider';
import { Toggle } from './Toggle';
import { NumberInput } from './NumberInput';

interface TextStyleControlProps {
  label: string;
  value: TextStyleConfig;
  onChange: (next: TextStyleConfig) => void;
}

const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Plus Jakarta', label: 'Plus Jakarta' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'System', label: 'System' },
];

const ALIGN_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

export function TextStyleControl({ label, value, onChange }: TextStyleControlProps) {
  const update = (patch: Partial<TextStyleConfig>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-4">
      <div className="flex items-center justify-between gap-2">
        <span className="t-h3">{label}</span>
        <span className="text-[11px] text-[var(--text-tertiary)]">{value.fontFamily}</span>
      </div>
      <ColorPicker
        label="Color"
        value={value.color}
        onChange={(color) => update({ color })}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Select
          label="Font family"
          value={value.fontFamily}
          onChange={(fontFamily) => update({ fontFamily: fontFamily as TextStyleConfig['fontFamily'] })}
          options={FONT_OPTIONS}
        />
        <Select
          label="Alignment"
          value={value.align}
          onChange={(align) => update({ align: align as TextStyleConfig['align'] })}
          options={ALIGN_OPTIONS}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <RangeSlider
          label="Size"
          value={value.fontSize}
          onChange={(fontSize) => update({ fontSize })}
          min={10}
          max={30}
          unit="px"
        />
        <RangeSlider
          label="Weight"
          value={value.fontWeight}
          onChange={(fontWeight) => update({ fontWeight })}
          min={100}
          max={900}
          step={100}
          unit=""
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Toggle
          checked={value.italic}
          onChange={(italic) => update({ italic })}
          label="Italic"
        />
        <Toggle
          checked={value.underline}
          onChange={(underline) => update({ underline })}
          label="Underline"
        />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <NumberInput label="Top" value={value.margin.top} onChange={(top) => update({ margin: { ...value.margin, top } })} min={0} max={64} />
        <NumberInput label="Right" value={value.margin.right} onChange={(right) => update({ margin: { ...value.margin, right } })} min={0} max={64} />
        <NumberInput label="Bottom" value={value.margin.bottom} onChange={(bottom) => update({ margin: { ...value.margin, bottom } })} min={0} max={64} />
        <NumberInput label="Left" value={value.margin.left} onChange={(left) => update({ margin: { ...value.margin, left } })} min={0} max={64} />
      </div>
    </div>
  );
}
