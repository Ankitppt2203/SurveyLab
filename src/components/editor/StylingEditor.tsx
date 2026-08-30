import type {
  AppearanceStyleConfig,
  CtaStyleConfig,
  CrossButtonStyleConfig,
  EditorAction,
  EditorState,
  OptionStateStyleConfig,
  StylingConfig,
  ThankYouStyleConfig,
} from '../../types';
import { Section } from '../controls/Section';
import { ColorPicker } from '../controls/ColorPicker';
import { Select } from '../controls/Select';
import { RangeSlider } from '../controls/RangeSlider';
import { Toggle } from '../controls/Toggle';
import { NumberInput } from '../controls/NumberInput';
import { TextStyleControl } from '../controls/TextStyleControl';
import { StateStyleControl } from '../controls/StateStyleControl';
import { RadiusControl } from '../controls/RadiusControl';
import { SpacingControl } from '../controls/SpacingControl';
import { UploadControl } from '../controls/UploadControl';

interface StylingEditorProps {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
}

const FONT_OPTIONS = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Plus Jakarta', label: 'Plus Jakarta' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'System', label: 'System' },
];

const BUTTON_STYLES = [
  { value: 'solid', label: 'Solid' },
  { value: 'outline', label: 'Outline' },
  { value: 'soft', label: 'Soft' },
];

const PROGRESS_STYLES = [
  { value: 'bar', label: 'Bar' },
  { value: 'dots', label: 'Dots' },
  { value: 'numbers', label: 'Numbers' },
];

const ALIGN_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

const OPTION_LAYOUTS = [
  { value: 'outlined', label: 'Outlined' },
  { value: 'filled', label: 'Filled' },
];

const OPTION_MODES = [
  { value: 'radio', label: 'Radio' },
  { value: 'checkbox', label: 'Checkbox' },
];

const CROSS_STYLES = [
  { value: 'x', label: 'X' },
  { value: 'fill', label: 'Fill' },
  { value: 'stroke', label: 'Stroke' },
];

export function StylingEditor({ state, dispatch }: StylingEditorProps) {
  const update = (patch: Partial<StylingConfig>) =>
    dispatch({ type: 'UPDATE_STYLING', payload: patch });

  const updateAppearance = (patch: Partial<AppearanceStyleConfig>) =>
    update({
      appearance: { ...state.styling.appearance, ...patch },
      bgColor: patch.backgroundColor ?? state.styling.bgColor,
    });

  const updateOptionState = (
    key: 'selectedOption' | 'unselectedOption' | 'commentStyle',
    patch: Partial<OptionStateStyleConfig>,
  ) => update({ [key]: { ...state.styling[key], ...patch } } as Partial<StylingConfig>);

  const updateCta = (patch: Partial<CtaStyleConfig>) =>
    update({ ctaStyle: { ...state.styling.ctaStyle, ...patch } });

  const updateCross = (patch: Partial<CrossButtonStyleConfig>) =>
    update({ crossButton: { ...state.styling.crossButton, ...patch } });

  const updateThankYouStyle = (patch: Partial<ThankYouStyleConfig>) =>
    update({ thankYouStyle: { ...state.styling.thankYouStyle, ...patch } });

  return (
    <div className="space-y-4 sm:space-y-5">
      <Section
        title="Brand"
        description="Set the accent color used for buttons and selections."
        defaultOpen={true}
      >
        <ColorPicker
          label="Accent color"
          value={state.styling.accentColor}
          onChange={(accentColor) => update({ accentColor })}
        />
      </Section>

      <Section
        title="Appearance"
        description="Tune the survey canvas and modal backdrop."
        defaultOpen={false}
      >
        <div className="space-y-4">
          <ColorPicker
            label="Background color"
            value={state.styling.bgColor}
            onChange={(backgroundColor) => updateAppearance({ backgroundColor })}
            presets={['#FFFFFF', '#F8FAFC', '#F1F5F9', '#0F172A', '#1E1B4B', '#0C4A6E']}
          />
          <RadiusControl
            label="Corner radius"
            value={state.styling.appearance.borderRadius}
            onChange={(borderRadius) => updateAppearance({ borderRadius })}
            min={0}
            max={64}
          />
          <RangeSlider
            label="Display delay"
            value={state.styling.appearance.displayDelay}
            onChange={(displayDelay) => updateAppearance({ displayDelay })}
            min={0}
            max={1000}
            step={25}
            unit="ms"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ColorPicker
              label="Backdrop color"
              value={state.styling.appearance.backdropColor}
              onChange={(backdropColor) => updateAppearance({ backdropColor })}
            />
            <RangeSlider
              label="Backdrop opacity"
              value={Math.round(state.styling.appearance.backdropOpacity * 100)}
              onChange={(v) => updateAppearance({ backdropOpacity: v / 100 })}
              min={0}
              max={100}
              unit="%"
            />
          </div>
        </div>
      </Section>

      <Section
        title="Typography"
        description="Adjust the survey's base typography and specific heading styles."
        defaultOpen={false}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Select
              label="Global font family"
              value={state.styling.fontFamily}
              onChange={(fontFamily) => update({ fontFamily: fontFamily as StylingConfig['fontFamily'] })}
              options={FONT_OPTIONS}
            />
            <RangeSlider
              label="Base font size"
              value={state.styling.fontSize}
              onChange={(fontSize) => update({ fontSize })}
              min={12}
              max={20}
              unit="px"
            />
          </div>
          <TextStyleControl
            label="Question title"
            value={state.styling.questionTitle}
            onChange={(questionTitle) => update({ questionTitle })}
          />
          <TextStyleControl
            label="Subtitle"
            value={state.styling.subtitleStyle}
            onChange={(subtitleStyle) => update({ subtitleStyle })}
          />
        </div>
      </Section>

      <Section
        title="Options"
        description="Control option list layout and selected/unselected states."
        defaultOpen={false}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Select
              label="Input style"
              value={state.styling.optionList.mode}
              onChange={(mode) => update({ optionList: { ...state.styling.optionList, mode: mode as StylingConfig['optionList']['mode'] } })}
              options={OPTION_MODES}
            />
            <Select
              label="Option layout"
              value={state.styling.optionList.layout}
              onChange={(layout) => update({ optionList: { ...state.styling.optionList, layout: layout as StylingConfig['optionList']['layout'] } })}
              options={OPTION_LAYOUTS}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <RangeSlider
              label="Option height"
              value={state.styling.optionList.optionHeight}
              onChange={(optionHeight) => update({ optionList: { ...state.styling.optionList, optionHeight } })}
              min={40}
              max={72}
              unit="px"
            />
            <RangeSlider
              label="Bullet spacing"
              value={state.styling.optionList.bulletSpacing}
              onChange={(bulletSpacing) => update({ optionList: { ...state.styling.optionList, bulletSpacing } })}
              min={4}
              max={24}
              unit="px"
            />
            <RangeSlider
              label="Option spacing"
              value={state.styling.optionList.optionSpacing}
              onChange={(optionSpacing) => update({ optionList: { ...state.styling.optionList, optionSpacing } })}
              min={4}
              max={20}
              unit="px"
            />
          </div>
          <RadiusControl
            label="Option corner radius"
            value={state.styling.optionList.borderRadius}
            onChange={(borderRadius) => update({ optionList: { ...state.styling.optionList, borderRadius } })}
            min={0}
            max={40}
          />
          <StateStyleControl
            label="Selected option"
            value={state.styling.selectedOption}
            onChange={(selectedOption) => update({ selectedOption })}
          />
          <StateStyleControl
            label="Unselected option"
            value={state.styling.unselectedOption}
            onChange={(unselectedOption) => update({ unselectedOption })}
          />
          <StateStyleControl
            label="Additional comments"
            value={state.styling.commentStyle}
            onChange={(commentStyle) => update({ commentStyle })}
          />
        </div>
      </Section>

      <Section
        title="Buttons"
        description="Set the main CTA appearance and the close icon styling."
        defaultOpen={false}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <RangeSlider
              label="Legacy button radius"
              value={state.styling.buttonRadius}
              onChange={(buttonRadius) => update({ buttonRadius })}
              min={0}
              max={28}
              unit="px"
            />
            <Select
              label="Legacy button style"
              value={state.styling.buttonStyle}
              onChange={(buttonStyle) => update({ buttonStyle: buttonStyle as StylingConfig['buttonStyle'] })}
              options={BUTTON_STYLES}
            />
          </div>
          <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="t-h3">CTA button</span>
              <Toggle
                checked={state.styling.ctaStyle.fullWidth}
                onChange={(fullWidth) => updateCta({ fullWidth })}
                label="Full width"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ColorPicker
                label="Background"
                value={state.styling.ctaStyle.backgroundColor}
                onChange={(backgroundColor) => updateCta({ backgroundColor })}
              />
              <ColorPicker
                label="Text"
                value={state.styling.ctaStyle.textColor}
                onChange={(textColor) => updateCta({ textColor })}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ColorPicker
                label="Border"
                value={state.styling.ctaStyle.borderColor}
                onChange={(borderColor) => updateCta({ borderColor })}
              />
              <Select
                label="Alignment"
                value={state.styling.ctaStyle.align}
                onChange={(align) => updateCta({ align: align as StylingConfig['ctaStyle']['align'] })}
                options={ALIGN_OPTIONS}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select
                label="Font family"
                value={state.styling.ctaStyle.fontFamily}
                onChange={(fontFamily) => updateCta({ fontFamily: fontFamily as StylingConfig['ctaStyle']['fontFamily'] })}
                options={FONT_OPTIONS}
              />
              <RangeSlider
                label="Font size"
                value={state.styling.ctaStyle.fontSize}
                onChange={(fontSize) => updateCta({ fontSize })}
                min={12}
                max={20}
                unit="px"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <RangeSlider
                label="Button height"
                value={state.styling.ctaStyle.height}
                onChange={(height) => updateCta({ height })}
                min={36}
                max={64}
                unit="px"
              />
              <RangeSlider
                label="Button width"
                value={state.styling.ctaStyle.width}
                onChange={(width) => updateCta({ width })}
                min={40}
                max={100}
                unit="%"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <RangeSlider
                label="Border width"
                value={state.styling.ctaStyle.borderWidth}
                onChange={(borderWidth) => updateCta({ borderWidth })}
                min={0}
                max={4}
                step={0.5}
                unit="px"
              />
              <RangeSlider
                label="Font weight"
                value={state.styling.ctaStyle.fontWeight}
                onChange={(fontWeight) => updateCta({ fontWeight })}
                min={100}
                max={900}
                step={100}
                unit=""
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Toggle checked={state.styling.ctaStyle.italic} onChange={(italic) => updateCta({ italic })} label="Italic" />
              <Toggle checked={state.styling.ctaStyle.underline} onChange={(underline) => updateCta({ underline })} label="Underline" />
            </div>
            <RadiusControl
              label="Corner radius"
              value={state.styling.ctaStyle.radius}
              onChange={(radius) => updateCta({ radius })}
              min={0}
              max={48}
            />
            <SpacingControl
              label="Button margins"
              value={state.styling.ctaStyle.margin}
              onChange={(margin) => updateCta({ margin })}
              min={0}
              max={64}
            />
          </div>
          <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="t-h3">Cross button</span>
              <Toggle
                checked={state.styling.crossButton.enabled}
                onChange={(enabled) => updateCross({ enabled })}
                label="Enable"
              />
            </div>
            {state.styling.crossButton.enabled && (
              <div className="space-y-3">
                <Select
                  label="Style"
                  value={state.styling.crossButton.variant}
                  onChange={(variant) => updateCross({ variant: variant as StylingConfig['crossButton']['variant'] })}
                  options={CROSS_STYLES}
                />
                <UploadControl
                  label="Custom icon"
                  description="PNG, JPG, JPEG, GIF. Use a square icon for the close button."
                  value={state.styling.crossButton.customIconUrl}
                  mediaType="image"
                  fileName={null}
                  onChange={(customIconUrl) => updateCross({ customIconUrl })}
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <ColorPicker
                    label="Icon color"
                    value={state.styling.crossButton.color}
                    onChange={(color) => updateCross({ color })}
                  />
                  <ColorPicker
                    label="Fill color"
                    value={state.styling.crossButton.fillColor}
                    onChange={(fillColor) => updateCross({ fillColor })}
                  />
                  <ColorPicker
                    label="Stroke color"
                    value={state.styling.crossButton.strokeColor}
                    onChange={(strokeColor) => updateCross({ strokeColor })}
                  />
                </div>
                <RangeSlider
                  label="Size"
                  value={state.styling.crossButton.size}
                  onChange={(size) => updateCross({ size })}
                  min={10}
                  max={24}
                  unit="px"
                />
                <SpacingControl
                  label="Margins"
                  value={state.styling.crossButton.margin}
                  onChange={(margin) => updateCross({ margin })}
                  min={0}
                  max={48}
                />
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section
        title="Layout"
        description="Inner padding of each survey page."
        defaultOpen={false}
      >
        <RangeSlider
          label="Page padding"
          value={state.styling.pagePadding}
          onChange={(pagePadding) => update({ pagePadding })}
          min={12}
          max={36}
          unit="px"
        />
      </Section>

      <Section
        title="Progress"
        description="Show respondents where they are in the survey."
        defaultOpen={false}
      >
        <div className="space-y-4">
          <div className="rounded-lg bg-[var(--bg-subtle)] px-4 py-3">
            <Toggle
              checked={state.styling.showProgress}
              onChange={(showProgress) => update({ showProgress })}
              label="Show progress"
              description="Display a progress indicator at the top of each page."
            />
          </div>
          {state.styling.showProgress && (
            <Select
              label="Progress style"
              value={state.styling.progressStyle}
              onChange={(progressStyle) => update({ progressStyle: progressStyle as StylingConfig['progressStyle'] })}
              options={PROGRESS_STYLES}
            />
          )}
        </div>
      </Section>

      <Section
        title="Thank you page style"
        description="Style the confirmation screen shown after submission."
        defaultOpen={false}
      >
        <div className="space-y-4">
          <TextStyleControl
            label="Thank you title"
            value={state.styling.thankYouStyle.title}
            onChange={(title) => updateThankYouStyle({ title })}
          />
          <TextStyleControl
            label="Thank you subtitle"
            value={state.styling.thankYouStyle.subtitle}
            onChange={(subtitle) => updateThankYouStyle({ subtitle })}
          />
          <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-4">
            <span className="t-h3">Image styling</span>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <NumberInput
                label="Width"
                value={state.styling.thankYouStyle.imageWidth}
                onChange={(imageWidth) => updateThankYouStyle({ imageWidth })}
                min={48}
                max={260}
                suffix="px"
              />
              <NumberInput
                label="Height"
                value={state.styling.thankYouStyle.imageHeight}
                onChange={(imageHeight) => updateThankYouStyle({ imageHeight })}
                min={48}
                max={260}
                suffix="px"
              />
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <NumberInput
                label="Corner radius"
                value={state.styling.thankYouStyle.imageRadius}
                onChange={(imageRadius) => updateThankYouStyle({ imageRadius })}
                min={0}
                max={48}
                suffix="px"
              />
              <NumberInput
                label="Border width"
                value={state.styling.thankYouStyle.imageBorderWidth}
                onChange={(imageBorderWidth) => updateThankYouStyle({ imageBorderWidth })}
                min={0}
                max={6}
                suffix="px"
              />
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ColorPicker
                label="Border color"
                value={state.styling.thankYouStyle.imageBorderColor}
                onChange={(imageBorderColor) => updateThankYouStyle({ imageBorderColor })}
              />
              <Select
                label="Alignment"
                value={state.styling.thankYouStyle.imageAlign}
                onChange={(imageAlign) => updateThankYouStyle({ imageAlign: imageAlign as StylingConfig['thankYouStyle']['imageAlign'] })}
                options={ALIGN_OPTIONS}
              />
            </div>
          </div>
          <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="t-h3">Thank you CTA</span>
              <Toggle
                checked={state.styling.thankYouStyle.button.fullWidth}
                onChange={(fullWidth) => updateThankYouStyle({ button: { ...state.styling.thankYouStyle.button, fullWidth } })}
                label="Full width"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ColorPicker
                label="Background"
                value={state.styling.thankYouStyle.button.backgroundColor}
                onChange={(backgroundColor) => updateThankYouStyle({ button: { ...state.styling.thankYouStyle.button, backgroundColor } })}
              />
              <ColorPicker
                label="Text"
                value={state.styling.thankYouStyle.button.textColor}
                onChange={(textColor) => updateThankYouStyle({ button: { ...state.styling.thankYouStyle.button, textColor } })}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ColorPicker
                label="Border"
                value={state.styling.thankYouStyle.button.borderColor}
                onChange={(borderColor) => updateThankYouStyle({ button: { ...state.styling.thankYouStyle.button, borderColor } })}
              />
              <Select
                label="Alignment"
                value={state.styling.thankYouStyle.button.align}
                onChange={(align) => updateThankYouStyle({ button: { ...state.styling.thankYouStyle.button, align: align as StylingConfig['thankYouStyle']['button']['align'] } })}
                options={ALIGN_OPTIONS}
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select
                label="Font family"
                value={state.styling.thankYouStyle.button.fontFamily}
                onChange={(fontFamily) => updateThankYouStyle({ button: { ...state.styling.thankYouStyle.button, fontFamily: fontFamily as StylingConfig['thankYouStyle']['button']['fontFamily'] } })}
                options={FONT_OPTIONS}
              />
              <RangeSlider
                label="Font size"
                value={state.styling.thankYouStyle.button.fontSize}
                onChange={(fontSize) => updateThankYouStyle({ button: { ...state.styling.thankYouStyle.button, fontSize } })}
                min={12}
                max={20}
                unit="px"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <RangeSlider
                label="Height"
                value={state.styling.thankYouStyle.button.height}
                onChange={(height) => updateThankYouStyle({ button: { ...state.styling.thankYouStyle.button, height } })}
                min={36}
                max={64}
                unit="px"
              />
              <RangeSlider
                label="Border width"
                value={state.styling.thankYouStyle.button.borderWidth}
                onChange={(borderWidth) => updateThankYouStyle({ button: { ...state.styling.thankYouStyle.button, borderWidth } })}
                min={0}
                max={4}
                step={0.5}
                unit="px"
              />
            </div>
            <RadiusControl
              label="Corner radius"
              value={state.styling.thankYouStyle.button.radius}
              onChange={(radius) => updateThankYouStyle({ button: { ...state.styling.thankYouStyle.button, radius } })}
              min={0}
              max={48}
            />
            <SpacingControl
              label="Button margins"
              value={state.styling.thankYouStyle.button.margin}
              onChange={(margin) => updateThankYouStyle({ button: { ...state.styling.thankYouStyle.button, margin } })}
              min={0}
              max={64}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
