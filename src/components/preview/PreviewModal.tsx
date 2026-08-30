import { useEffect } from 'react';
import type { EditorState } from '../../types';
import { PhonePreview } from './PhonePreview';

interface PreviewModalProps {
  state: EditorState;
  onClose: () => void;
}

export function PreviewModal({ state, onClose }: PreviewModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 fade-up"
      role="dialog"
      aria-modal="true"
      aria-label="Survey preview"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          backgroundColor: state.styling.appearance.backdropColor,
          opacity: state.styling.appearance.backdropOpacity,
        }}
        onClick={onClose}
      />

      {/* Modal shell */}
      <div className="preview-modal relative z-10 flex max-h-[96vh] w-full max-w-[420px] flex-col overflow-hidden rounded-2xl border border-[var(--border-default)] bg-white shadow-[var(--shadow-lg)]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-white px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-softer)] text-[var(--accent)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="2.5" width="12" height="19" rx="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M10 18.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <div className="flex flex-col">
              <span className="t-h3 leading-none">Live preview</span>
              <span className="mt-0.5 text-[11.5px] text-[var(--text-tertiary)]">
                Updates as you edit
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            aria-label="Close preview"
          >
            <svg width={state.styling.crossButton.size} height={state.styling.crossButton.size} viewBox="0 0 14 14" fill="none">
              <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke={state.styling.crossButton.color} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="preview-modal-body flex flex-1 items-start justify-center overflow-y-auto bg-[var(--bg-subtle)] px-4 py-6 scroll-area">
          <div className="preview-modal-phone-wrapper">
            <PhonePreview state={state} compact />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] bg-white px-4 py-3">
          <div className="flex items-center gap-2 text-[11.5px] text-[var(--text-tertiary)]">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
            Live preview
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 items-center gap-1.5 rounded-md bg-[var(--accent)] px-3 text-[12.5px] font-medium text-white shadow-[var(--shadow-sm)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            Continue editing
          </button>
        </div>
      </div>
    </div>
  );
}
