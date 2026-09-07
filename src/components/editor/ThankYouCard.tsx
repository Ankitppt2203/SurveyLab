import { Section } from '../controls/Section';
import { TextInput } from '../controls/TextInput';
import { Toggle } from '../controls/Toggle';
import { Select } from '../controls/Select';
import type { ThankYouConfig } from '../../types';

interface ThankYouCardProps {
  config: ThankYouConfig;
  onToggle: () => void;
  onUpdate: (patch: Partial<ThankYouConfig>) => void;
}

const REDIRECT_OPTIONS = [
  { value: 'close', label: 'Close survey' },
  { value: 'home', label: 'Go to home page' },
  { value: 'survey', label: 'Restart survey' },
  { value: 'url', label: 'Redirect to URL' },
];

export function ThankYouCard({ config, onToggle, onUpdate }: ThankYouCardProps) {
  return (
    <Section
      title="Thank you page"
      description="Final screen shown after respondents submit."
      defaultOpen={true}
      badge={
        <span
          className={
            'rounded-full px-2 py-0.5 text-[10.5px] font-medium ' +
            (config.enabled
              ? 'bg-[var(--success-soft)] text-[var(--success)]'
              : 'bg-[var(--bg-active)] text-[var(--text-tertiary)]')
          }
        >
          {config.enabled ? 'On' : 'Off'}
        </span>
      }
    >
      <div className="mb-4 rounded-lg bg-[var(--bg-subtle)] px-3 py-3 sm:px-4">
        <Toggle
          checked={config.enabled}
          onChange={onToggle}
          label="Enable thank you page"
          description="Show a custom confirmation screen after submission."
        />
      </div>

      {config.enabled && (
        <div className="space-y-3.5 sm:space-y-4">
          <TextInput
            label="Title"
            value={config.title}
            onChange={(v) => onUpdate({ title: v })}
            placeholder="Thank you!"
          />
          <TextInput
            label="Subtitle"
            value={config.subtitle}
            onChange={(v) => onUpdate({ subtitle: v })}
            placeholder="Your responses have been recorded."
          />
          <TextInput
            label="Button text"
            value={config.ctaText}
            onChange={(v) => onUpdate({ ctaText: v })}
            placeholder="Close"
            maxLength={20}
          />
          <Select
            label="On click"
            value={config.redirect}
            onChange={(v) => onUpdate({ redirect: v as ThankYouConfig['redirect'] })}
            options={REDIRECT_OPTIONS}
          />
          {config.redirect === 'url' && (
            <TextInput
              label="Redirect URL"
              value={config.redirectUrl}
              onChange={(v) => onUpdate({ redirectUrl: v })}
              placeholder="https://example.com"
              type="url"
            />
          )}
        </div>
      )}
    </Section>
  );
}
