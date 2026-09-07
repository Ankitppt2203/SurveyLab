import { useState } from 'react';
import type { ConditionalRule, SurveyQuestion } from '../../types';
import { Section } from '../controls/Section';
import { Select } from '../controls/Select';
import { cn } from '../../lib/utils';

interface LogicCardProps {
  questions: SurveyQuestion[];
  conditions: ConditionalRule[];
  onAdd: () => void;
  onUpdate: (id: string, patch: Partial<ConditionalRule>) => void;
  onDelete: (id: string) => void;
}

export function LogicCard({ questions, conditions, onAdd, onUpdate, onDelete }: LogicCardProps) {
  return (
    <Section
      title="Conditional logic"
      description="Show or skip questions based on previous answers."
      defaultOpen={false}
    >
      {conditions.length === 0 ? (
        <EmptyState onAdd={onAdd} />
      ) : (
        <div className="space-y-3">
          {conditions.map((rule, idx) => (
            <ConditionRow
              key={rule.id}
              index={idx}
              rule={rule}
              questions={questions}
              onUpdate={(patch) => onUpdate(rule.id, patch)}
              onDelete={() => onDelete(rule.id)}
            />
          ))}
          <button
            type="button"
            onClick={onAdd}
            className="flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-[var(--border-default)] bg-[var(--bg-subtle)] text-[12.5px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-softer)] hover:text-[var(--accent)]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 3v6M3 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Add condition
          </button>
        </div>
      )}
    </Section>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-[var(--border-default)] bg-[var(--bg-subtle)] px-4 py-6 text-center">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-[var(--shadow-xs)]">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6l4 4 4-4M4 10h8" stroke="#5B5BD6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div>
        <p className="t-h3">No conditions yet</p>
        <p className="t-small mt-0.5">Skip questions based on how respondents answer.</p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-1 flex h-8 items-center gap-1.5 rounded-md border border-[var(--border-default)] bg-white px-3 text-[12.5px] font-medium text-[var(--text-primary)] shadow-[var(--shadow-xs)] transition-colors hover:bg-[var(--bg-hover)]"
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M6 3v6M3 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        Add condition
      </button>
    </div>
  );
}

function ConditionRow({
  index,
  rule,
  questions,
  onUpdate,
  onDelete,
}: {
  index: number;
  rule: ConditionalRule;
  questions: SurveyQuestion[];
  onUpdate: (patch: Partial<ConditionalRule>) => void;
  onDelete: () => void;
}) {
  const ifQuestion = questions.find((q) => q.id === rule.ifQuestionId);
  const optionOptions = (ifQuestion?.options || []).map((opt) => ({ value: opt.id, label: opt.label }));
  const thenOptions = questions
    .filter((q) => q.id !== rule.ifQuestionId)
    .map((q, i) => ({ value: q.id, label: `Question ${questions.indexOf(q) + 1}` }));

  const questionOptions = questions.map((q, i) => ({ value: q.id, label: `Question ${i + 1}` }));

  return (
    <div className="rounded-lg border border-[var(--border-default)] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="t-eyebrow">Condition {index + 1}</span>
        <button
          type="button"
          onClick={onDelete}
          className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--danger)] transition-colors hover:bg-[var(--bg-hover)] hover:text-red-600"
          aria-label="Delete condition"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M3.5 5h7M5.5 5V3.5h3V5M4.5 5l.5 6h4l.5-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <span className="text-[11.5px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">If answer to</span>
          <Select
            value={rule.ifQuestionId}
            onChange={(v) => onUpdate({ ifQuestionId: v, ifOptionId: '' })}
            options={questionOptions}
            placeholder="Choose a question"
          />
        </div>
        <div className="space-y-2">
          <span className="text-[11.5px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">is</span>
          <Select
            value={rule.ifOptionId}
            onChange={(v) => onUpdate({ ifOptionId: v })}
            options={optionOptions}
            placeholder="Choose an option"
          />
        </div>
      </div>
      <div className="my-3 flex items-center gap-3">
        <span className="h-px flex-1 bg-[var(--border-subtle)]" />
        <span className="text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Then jump to</span>
        <span className="h-px flex-1 bg-[var(--border-subtle)]" />
      </div>
      <Select
        value={rule.thenQuestionId}
        onChange={(v) => onUpdate({ thenQuestionId: v })}
        options={thenOptions}
        placeholder="Choose a target question"
      />
    </div>
  );
}
