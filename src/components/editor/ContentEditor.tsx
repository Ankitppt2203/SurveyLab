import { useState } from 'react';
import type { EditorState, EditorAction, SurveyQuestion } from '../../types';
import { uid } from '../../lib/defaults';
import { Section } from '../controls/Section';
import { TextInput } from '../controls/TextInput';
import { NumberInput } from '../controls/NumberInput';
import { OptionRow } from '../controls/OptionRow';
import { QuestionCard } from './QuestionCard';
import { LogicCard } from './LogicCard';
import { ThankYouCard } from './ThankYouCard';

interface ContentEditorProps {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
}

type DraftQuestionState = {
  title: string;
  options: Array<{ id: string; label: string }>;
};

const createDraftQuestion = (): DraftQuestionState => ({
  title: '',
  options: [
    { id: uid('draft_opt'), label: 'Option 1' },
    { id: uid('draft_opt'), label: 'Option 2' },
  ],
});

const buildQuestion = (draft: DraftQuestionState, index: number): SurveyQuestion => ({
  id: uid('q'),
  title: draft.title.trim() || `Question ${index + 1}`,
  subtitle: '',
  options: draft.options.map((option, optionIndex) => ({
    id: uid('opt'),
    label: option.label.trim() || `Option ${optionIndex + 1}`,
  })),
  showComments: false,
  commentsLabel: 'Additional comments',
  ctaText: 'Continue',
});

export function ContentEditor({ state, dispatch }: ContentEditorProps) {
  const { questions, conditions, thankYou } = state;
  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState<DraftQuestionState>(createDraftQuestion());

  const openComposer = () => {
    setDraft(createDraftQuestion());
    setComposerOpen(true);
  };

  const closeComposer = () => {
    setComposerOpen(false);
    setDraft(createDraftQuestion());
  };

  const saveQuestion = () => {
    const question = buildQuestion(draft, questions.length);
    dispatch({ type: 'INSERT_QUESTION', payload: { question } });
    closeComposer();
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <Section
        title="Survey setup"
        description="Name your survey and choose how many questions to include."
        defaultOpen={true}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
          <TextInput
            label="Survey name"
            value={state.surveyName}
            onChange={(v) => dispatch({ type: 'SET_SURVEY_NAME', payload: v })}
            placeholder="Untitled survey"
          />
          <NumberInput
            label="Number of questions"
            value={questions.length}
            onChange={(v) => dispatch({ type: 'SET_QUESTION_COUNT', payload: v })}
            min={1}
            max={12}
          />
        </div>
      </Section>

      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="t-h2">Questions</h2>
          <span className="t-small text-[var(--text-tertiary)] tabular-nums">
            {questions.length} total
          </span>
        </div>
        <div className="space-y-3">
          <button
            type="button"
            onClick={openComposer}
            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-[var(--border-default)] bg-[var(--bg-subtle)] text-[12.5px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-softer)] hover:text-[var(--accent)]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 3v6M3 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Add question
          </button>

          {composerOpen && (
            <section className="rounded-xl border border-[var(--border-default)] bg-white shadow-[var(--shadow-xs)]">
              <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] px-4 py-3.5 sm:px-5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 min-w-7 items-center justify-center rounded-md bg-[var(--accent-softer)] px-2 text-[11px] font-semibold text-[var(--accent)] tabular-nums">
                    Q{questions.length + 1}
                  </span>
                  <div>
                    <h3 className="t-h3">New question</h3>
                    <p className="t-small">Write the question and add answer options before saving.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeComposer}
                  className="rounded-md px-2 py-1 text-[12px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                >
                  Cancel
                </button>
              </div>

              <div className="space-y-5 px-4 pb-5 pt-4 sm:px-5">
                <TextInput
                  label="Write question"
                  value={draft.title}
                  onChange={(title) => setDraft((current) => ({ ...current, title }))}
                  placeholder="Type your question"
                />

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="t-eyebrow">Options</span>
                    <span className="text-[11.5px] text-[var(--text-tertiary)] tabular-nums">
                      {draft.options.length} total
                    </span>
                  </div>
                  <div className="space-y-2">
                    {draft.options.map((option, index) => (
                      <OptionRow
                        key={option.id}
                        index={index}
                        value={option.label}
                        onChange={(value) =>
                          setDraft((current) => ({
                            ...current,
                            options: current.options.map((item) =>
                              item.id === option.id ? { ...item, label: value } : item,
                            ),
                          }))
                        }
                        onDelete={() =>
                          setDraft((current) => ({
                            ...current,
                            options: current.options.filter((item) => item.id !== option.id),
                          }))
                        }
                        canDelete={draft.options.length > 2}
                        accentColor="#5B5BD6"
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft((current) => ({
                        ...current,
                        options: [
                          ...current.options,
                          { id: uid('draft_opt'), label: `Option ${current.options.length + 1}` },
                        ],
                      }))
                    }
                    className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-[var(--border-default)] bg-[var(--bg-subtle)] text-[12.5px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-softer)] hover:text-[var(--accent)]"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 3v6M3 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Add option
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={saveQuestion}
                    className="h-9 rounded-md bg-[var(--accent)] px-4 text-[12.5px] font-medium text-white transition-colors hover:opacity-95"
                  >
                    Add question
                  </button>
                </div>
              </div>
            </section>
          )}

          <div className="space-y-3">
            {questions.map((q, idx) => (
              <QuestionCard
                key={q.id}
                index={idx}
                total={questions.length}
                question={q}
                onUpdate={(patch) =>
                  dispatch({ type: 'UPDATE_QUESTION', payload: { id: q.id, patch } })
                }
                onDeleteQuestion={() => dispatch({ type: 'DELETE_QUESTION', payload: { id: q.id } })}
                onAddOption={() => dispatch({ type: 'ADD_OPTION', payload: { questionId: q.id } })}
                onUpdateOption={(optionId, label) =>
                  dispatch({
                    type: 'UPDATE_OPTION',
                    payload: { questionId: q.id, optionId, label },
                  })
                }
                onDeleteOption={(optionId) =>
                  dispatch({ type: 'DELETE_OPTION', payload: { questionId: q.id, optionId } })
                }
                onToggleComments={() =>
                  dispatch({ type: 'TOGGLE_COMMENTS', payload: { questionId: q.id } })
                }
              />
            ))}
          </div>
        </div>
      </div>

      <LogicCard
        questions={questions}
        conditions={conditions}
        onAdd={() => dispatch({ type: 'ADD_CONDITION' })}
        onUpdate={(id, patch) =>
          dispatch({ type: 'UPDATE_CONDITION', payload: { id, patch } })
        }
        onDelete={(id) => dispatch({ type: 'DELETE_CONDITION', payload: { id } })}
      />

      <ThankYouCard
        config={thankYou}
        onToggle={() => dispatch({ type: 'TOGGLE_THANKYOU' })}
        onUpdate={(patch) => dispatch({ type: 'UPDATE_THANKYOU', payload: patch })}
      />
    </div>
  );
}
