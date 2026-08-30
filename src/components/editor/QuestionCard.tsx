import { useState } from 'react';
import type { SurveyQuestion } from '../../types';
import { cn } from '../../lib/utils';
import { Section } from '../controls/Section';
import { TextInput } from '../controls/TextInput';
import { Toggle } from '../controls/Toggle';
import { OptionRow } from '../controls/OptionRow';
import { MIN_OPTIONS } from '../../lib/editorReducer';

interface QuestionCardProps {
  index: number;
  total: number;
  question: SurveyQuestion;
  onUpdate: (patch: Partial<SurveyQuestion>) => void;
  onDeleteQuestion: () => void;
  onAddOption: () => void;
  onUpdateOption: (optionId: string, label: string) => void;
  onDeleteOption: (optionId: string) => void;
  onToggleComments: () => void;
}

export function QuestionCard({
  index,
  total,
  question,
  onUpdate,
  onDeleteQuestion,
  onAddOption,
  onUpdateOption,
  onDeleteOption,
  onToggleComments,
}: QuestionCardProps) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-white shadow-[var(--shadow-xs)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2.5 px-4 py-3.5 text-left sm:gap-3 sm:px-5 sm:py-4"
        aria-expanded={open}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
          <span className="flex h-7 min-w-7 flex-shrink-0 items-center justify-center rounded-md bg-[var(--accent-softer)] px-2 text-[11px] font-semibold text-[var(--accent)] tabular-nums">
            Q{index + 1}
          </span>
          <span className="t-h3 min-w-0 flex-1 truncate">{question.title || `Question ${index + 1}`}</span>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden text-[11.5px] text-[var(--text-tertiary)] tabular-nums sm:inline">
            {question.options.length} option{question.options.length !== 1 ? 's' : ''}
          </span>
          <button
            type="button"
            onClick={onDeleteQuestion}
            disabled={total <= 1}
            className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--danger)] disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Delete question"
            title={total <= 1 ? 'At least one question is required' : 'Delete question'}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 5h7M5.5 5V3.5h3V5M4.5 5l.5 6h4l.5-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-md text-[var(--text-tertiary)] transition-all',
              open ? 'rotate-180' : 'rotate-0',
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </button>

      {open && (
        <div className="space-y-5 border-t border-[var(--border-subtle)] px-4 pb-5 pt-5 sm:px-5">
          <div className="grid grid-cols-1 gap-4">
            <TextInput
              label="Question title"
              value={question.title}
              onChange={(v) => onUpdate({ title: v })}
              placeholder="What do you want to ask?"
            />
            <TextInput
              label="Subtitle"
              value={question.subtitle}
              onChange={(v) => onUpdate({ subtitle: v })}
              placeholder="Add context to help respondents answer"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="t-eyebrow">Options</span>
              <span className="text-[11.5px] text-[var(--text-tertiary)]">
                {question.options.length} total
              </span>
            </div>
            <div className="space-y-2">
              {question.options.map((opt, i) => (
                <OptionRow
                  key={opt.id}
                  index={i}
                  value={opt.label}
                  onChange={(v) => onUpdateOption(opt.id, v)}
                  onDelete={() => onDeleteOption(opt.id)}
                  canDelete={question.options.length > MIN_OPTIONS}
                  accentColor="#5B5BD6"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={onAddOption}
              className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-[var(--border-default)] bg-[var(--bg-subtle)] text-[12.5px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-softer)] hover:text-[var(--accent)]"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 3v6M3 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Add option
            </button>
          </div>

          <div className="space-y-3 rounded-lg bg-[var(--bg-subtle)] px-4 py-3">
            <Toggle
              checked={question.showComments}
              onChange={onToggleComments}
              label="Additional comments"
              description="Show an open text field below the options."
            />
            {question.showComments && (
              <TextInput
                label="Comments label"
                value={question.commentsLabel}
                onChange={(v) => onUpdate({ commentsLabel: v })}
                placeholder="e.g. Tell us more"
              />
            )}
          </div>

          <TextInput
            label="Button text"
            value={question.ctaText}
            onChange={(v) => onUpdate({ ctaText: v })}
            placeholder="Continue"
            maxLength={20}
          />

          {total > 1 && (
            <div className="flex items-center gap-2 text-[11.5px] text-[var(--text-tertiary)]">
              <span className="flex h-1 w-1 rounded-full bg-[var(--text-tertiary)]" />
              Question {index + 1} of {total}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
