import { useReducer, useState, useEffect } from 'react';
import { editorReducer } from './lib/editorReducer';
import { createInitialState } from './lib/defaults';
import { Header } from './components/Header';
import { ContentEditor } from './components/editor/ContentEditor';
import { StylingEditor } from './components/editor/StylingEditor';
import { PhonePreview } from './components/preview/PhonePreview';
import { PreviewModal } from './components/preview/PreviewModal';

type Tab = 'content' | 'styling';
type Viewport = 'mobile' | 'tablet' | 'desktop';

function App() {
  const [state, dispatch] = useReducer(editorReducer, undefined, createInitialState);
  const [activeTab, setActiveTab] = useState<Tab>('content');
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 640) setViewport('mobile');
      else if (w < 1024) setViewport('tablet');
      else setViewport('desktop');
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = viewport === 'mobile';
  const isTablet = viewport === 'tablet';
  const isDesktop = viewport === 'desktop';

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-app)]">
      <Header
        state={state}
        dispatch={dispatch}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenPreview={() => setPreviewOpen(true)}
      />

      {/* Mobile/tablet inline tab switcher (only when no centered desktop tabs) */}
      {isMobile && (
        <div className="flex items-center justify-center border-b border-[var(--border-default)] bg-white px-4 py-3">
          <div className="flex items-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] p-0.5">
            <MobileTab active={activeTab === 'content'} onClick={() => setActiveTab('content')} label="Content" />
            <MobileTab active={activeTab === 'styling'} onClick={() => setActiveTab('styling')} label="Styling" />
          </div>
        </div>
      )}

      <main
        className={
          'flex-1 ' +
          (isDesktop
            ? 'grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-4 px-4 py-5 sm:gap-6 sm:px-6 sm:py-6'
            : 'flex flex-col')
        }
      >
        {/* Editor column */}
        <section className={'min-w-0 scroll-area ' + (isDesktop ? 'overflow-hidden' : 'order-1')}>
          <div
            className={
              isDesktop
                ? 'h-full overflow-y-auto pr-1 scroll-area'
                : 'px-4 pb-4 pt-5 sm:px-6 sm:pb-6 sm:pt-6'
            }
          >
            {activeTab === 'content' ? (
              <ContentEditor state={state} dispatch={dispatch} />
            ) : (
              <StylingEditor state={state} dispatch={dispatch} />
            )}
          </div>
        </section>

        {/* Sticky side preview (desktop only) */}
        {isDesktop && (
          <section
            className={
              'sticky top-[68px] self-start preview-canvas flex min-h-0 items-start justify-center overflow-y-auto scroll-area sm:top-[76px]'
            }
            style={{ height: 'calc(100vh - 92px)' }}
          >
            <PhonePreview state={state} />
          </section>
        )}

        {/* Tablet and mobile inline preview */}
        {!isDesktop && (
          <section
            className={
              'order-2 mt-2 bg-white ' +
              (isTablet
                ? 'mx-4 mb-4 overflow-hidden rounded-2xl border border-[var(--border-default)] shadow-[var(--shadow-xs)]'
                : 'border-t border-[var(--border-default)]')
            }
          >
            <div className="flex items-center justify-between px-4 pt-4">
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                <span className="t-eyebrow">Live mobile preview</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="rounded-md px-2 py-1 text-[11.5px] font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent-softer)]"
              >
                Open popup
              </button>
            </div>
            <div className={isTablet ? 'flex items-start justify-center px-4 pb-6 pt-4' : 'flex items-start justify-center px-4 pb-8 pt-4'}>
              <PhonePreview state={state} />
            </div>
          </section>
        )}
      </main>

      {previewOpen && <PreviewModal state={state} onClose={() => setPreviewOpen(false)} />}
    </div>
  );
}

function MobileTab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'h-8 rounded-md px-4 text-[13px] font-medium transition-all ' +
        (active
          ? 'bg-white text-[var(--text-primary)] shadow-[var(--shadow-xs)]'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]')
      }
    >
      {label}
    </button>
  );
}

export default App;
