import type { OptionStateStyleConfig } from '../../types';
import { ColorPicker } from './ColorPicker';
import { Select } from './Select';
import { RangeSlider } from './RangeSlider';
import { Toggle } from './Toggle';

interface StateStyleControlProps {
  label: string;
  value: OptionStateStyleConfig;
  onChange: (next: OptionStateStyleConfig) => void;
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

export function StateStyleControl({ label, value, onChange }: StateStyleControlProps) {
  const update = (patch: Partial<OptionStateStyleConfig>) => onChange({ ...value, ...patch });

  return (
    <div className="space-y-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-4">
      <span className="t-h3">{label}</span>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ColorPicker label="Border" value={value.borderColor} onChange={(borderColor) => update({ borderColor })} />
        <ColorPicker label="Text" value={value.textColor} onChange={(textColor) => update({ textColor })} />
        <ColorPicker label="Background" value={value.backgroundColor} onChange={(backgroundColor) => update({ backgroundColor })} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <RangeSlider
          label="Border width"
          value={value.borderWidth}
          onChange={(borderWidth) => update({ borderWidth })}
          min={0}
          max={4}
          step={0.5}
          unit="px"
        />
        <Select
          label="Font family"
          value={value.fontFamily}
          onChange={(fontFamily) => update({ fontFamily: fontFamily as OptionStateStyleConfig['fontFamily'] })}
          options={FONT_OPTIONS}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <RangeSlider
          label="Font size"
          value={value.fontSize}
          onChange={(fontSize) => update({ fontSize })}
          min={10}
          max={22}
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
        <Toggle checked={value.italic} onChange={(italic) => update({ italic })} label="Italic" />
        <Toggle checked={value.underline} onChange={(underline) => update({ underline })} label="Underline" />
      </div>
      <Select
        label="Alignment"
        value={value.align}
        onChange={(align) => update({ align: align as OptionStateStyleConfig['align'] })}
        options={ALIGN_OPTIONS}
      />
    </div>
  );
}
