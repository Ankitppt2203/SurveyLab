import type { EditorState, EditorAction } from '../types';

interface HeaderProps {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
  activeTab: 'content' | 'styling';
  onTabChange: (tab: 'content' | 'styling') => void;
  onOpenPreview: () => void;
}

export function Header({ state, dispatch, activeTab, onTabChange, onOpenPreview }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-[56px] items-center justify-between gap-2 border-b border-[var(--border-default)] bg-white/90 px-3 backdrop-blur-md sm:h-[60px] sm:gap-3 sm:px-5">
      {/* Brand */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] shadow-[var(--shadow-sm)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 6h8a4 4 0 0 1 0 8H6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M6 14h10a4 4 0 0 1 0 8H6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
            <circle cx="18" cy="6" r="2" fill="#fff" />
          </svg>
        </div>
        <div className="flex min-w-0 items-baseline gap-1.5">
          <span className="truncate text-[14px] font-semibold tracking-tight text-[var(--text-primary)] sm:text-[15px]">Survey Lab</span>
        </div>
        <div className="mx-1 hidden h-5 w-px bg-[var(--border-default)] sm:mx-2 md:flex" />
        <input
          type="text"
          value={state.surveyName}
          onChange={(e) => dispatch({ type: 'SET_SURVEY_NAME', payload: e.target.value })}
          className="hidden h-8 min-w-0 max-w-[220px] flex-1 rounded-md border border-transparent bg-transparent px-2 text-[13px] font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-default)] focus:border-[var(--border-focus)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(91,91,214,0.15)] focus:outline-none lg:block lg:max-w-[260px]"
          placeholder="Untitled survey"
        />
      </div>

      {/* Tabs (desktop only) */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">
        <TabSwitcher activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      {/* Right actions */}
      <div className="flex flex-shrink-0 items-center gap-2">
        <span className="hidden items-center gap-1.5 text-[11.5px] text-[var(--text-tertiary)] lg:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
          <span>Auto-saving</span>
        </span>
        <button
          type="button"
          onClick={onOpenPreview}
          className="preview-button group flex h-9 items-center gap-1.5 rounded-md bg-[var(--accent)] px-2.5 text-[12.5px] font-medium text-white shadow-[var(--shadow-sm)] transition-all hover:bg-[var(--accent-hover)] hover:shadow-[var(--shadow-md)] sm:px-3.5"
          aria-label="Open live preview"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:scale-110">
            <path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8s-2.5 4.5-6.5 4.5S1.5 8 1.5 8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span className="hidden sm:inline">Preview</span>
        </button>
      </div>
    </header>
  );
}

export function TabSwitcher({
  activeTab,
  onTabChange,
}: {
  activeTab: 'content' | 'styling';
  onTabChange: (tab: 'content' | 'styling') => void;
}) {
  return (
    <div className="flex items-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] p-0.5">
      <Tab active={activeTab === 'content'} onClick={() => onTabChange('content')} label="Content" />
      <Tab active={activeTab === 'styling'} onClick={() => onTabChange('styling')} label="Styling" />
    </div>
  );
}

function Tab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'h-7 rounded-md px-3 text-[12.5px] font-medium transition-all ' +
        (active
          ? 'bg-white text-[var(--text-primary)] shadow-[var(--shadow-xs)]'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]')
      }
    >
      {label}
    </button>
  );
}
