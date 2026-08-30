import { useEffect, useState } from 'react';
import type {
  CornerRadii,
  CtaStyleConfig,
  CrossButtonStyleConfig,
  EditorState,
} from '../../types';
import { fontFamilyToCss, hexToRgba, cn } from '../../lib/utils';

interface PhonePreviewProps {
  state: EditorState;
  compact?: boolean;
}

type Screen =
  | { type: 'question'; questionId: string }
  | { type: 'thankyou' };

export function PhonePreview({ state, compact = false }: PhonePreviewProps) {
  const [screen, setScreen] = useState<Screen>({ type: 'question', questionId: state.questions[0]?.id ?? '' });
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [comment, setComment] = useState<Record<string, string>>({});

  useEffect(() => {
    setScreen({ type: 'question', questionId: state.questions[0]?.id ?? '' });
    setSelected({});
    setComment({});
  }, [state.questions.map((q) => q.id).join('|')]);

  const accent = state.styling.accentColor;
  const fontFamily = fontFamilyToCss(state.styling.fontFamily);
  const padding = state.styling.pagePadding;

  const accentSoft = hexToRgba(accent, 0.1);

  const goNext = () => {
    if (screen.type !== 'question') return;
    const currentIndex = state.questions.findIndex((q) => q.id === screen.questionId);
    const currentQuestion = state.questions[currentIndex];
    const selectedOptionId = selected[screen.questionId];
    const matchingRule = state.conditions.find(
      (rule) =>
        rule.ifQuestionId === currentQuestion?.id &&
        rule.ifOptionId === selectedOptionId &&
        state.questions.some((q) => q.id === rule.thenQuestionId),
    );

    if (matchingRule) {
      setScreen({ type: 'question', questionId: matchingRule.thenQuestionId });
      return;
    }

    const nextQuestion = state.questions[currentIndex + 1];
    if (nextQuestion) {
      setScreen({ type: 'question', questionId: nextQuestion.id });
    } else if (state.thankYou.enabled) {
      setScreen({ type: 'thankyou' });
    }
  };

  const goBack = () => {
    if (screen.type !== 'question') {
      setScreen({ type: 'question', questionId: state.questions[0]?.id ?? '' });
      return;
    }
    const idx = state.questions.findIndex((q) => q.id === screen.questionId);
    const prev = state.questions[idx - 1];
    if (prev) setScreen({ type: 'question', questionId: prev.id });
  };

  const reset = () => {
    setScreen({ type: 'question', questionId: state.questions[0]?.id ?? '' });
    setSelected({});
    setComment({});
  };

  const currentIndex =
    screen.type === 'question'
      ? state.questions.findIndex((q) => q.id === screen.questionId)
      : state.questions.length - 1;
  const totalSteps = state.questions.length + (state.thankYou.enabled ? 0 : -1);
  const progress =
    screen.type === 'thankyou'
      ? 1
      : Math.min(1, Math.max(0, (currentIndex + 1) / Math.max(1, state.questions.length)));

  return (
    <div className="flex h-fit w-full max-w-full flex-col items-center justify-start gap-3 px-2 py-4 scroll-area sm:gap-4 sm:px-4 sm:py-6">
      <div
        className={compact ? 'phone-frame phone-frame-modal' : 'phone-frame'}
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="phone-notch" />
        <div
          className="phone-screen"
          style={{
            background: state.styling.appearance.backgroundColor,
            color: '#0F172A',
            fontFamily,
            fontSize: `${state.styling.fontSize}px`,
            borderRadius: radiusToCss(state.styling.appearance.borderRadius),
          }}
        >
          <div
            className="phone-status"
            style={{ color: isDarkBg(state.styling.appearance.backgroundColor) ? '#F1F5F9' : '#0F172A' }}
          >
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 7c2-2 4-3 6-3s4 1 6 3M3 9c1-1 3-2 4-2s3 1 4 2M7 9.5h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                <rect x="0.5" y="0.5" width="18" height="9" rx="2" stroke="currentColor" />
                <rect x="2" y="2" width="15" height="6" rx="1" fill="currentColor" />
                <rect x="19.5" y="3.5" width="1.5" height="3" rx="0.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          <PreviewHeader
            state={state}
            accent={accent}
            accentSoft={accentSoft}
            progress={progress}
            totalSteps={state.questions.length}
            stepIndex={currentIndex}
            screenType={screen.type}
            onClose={reset}
            onBack={goBack}
            canGoBack={screen.type === 'question' && currentIndex > 0}
          />

          <div
            className="phone-content fade-up"
            key={screen.type === 'question' ? screen.questionId : 'thankyou'}
            style={{
              padding: `${padding}px`,
              animationDelay: `${state.styling.appearance.displayDelay}ms`,
            }}
          >
            {screen.type === 'question' ? (
              <QuestionView
                state={state}
                question={state.questions.find((q) => q.id === screen.questionId)!}
                accent={accent}
                accentSoft={accentSoft}
                selected={selected[screen.questionId] || null}
                comment={comment[screen.questionId] || ''}
                onSelect={(id) =>
                  setSelected((s) => ({ ...s, [screen.questionId]: id }))
                }
                onCommentChange={(v) =>
                  setComment((s) => ({ ...s, [screen.questionId]: v }))
                }
              />
            ) : (
              <ThankYouView state={state} accent={accent} />
            )}
          </div>

          <PreviewFooter
            state={state}
            screen={screen}
            accent={accent}
            onContinue={goNext}
            selectedId={screen.type === 'question' ? selected[screen.questionId] : null}
            isFinal={screen.type === 'thankyou'}
            onRestart={reset}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 px-2 text-center text-[11.5px] text-[var(--text-tertiary)]">
        <span className="flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--success)]" />
        <span>Live preview · Changes apply instantly</span>
      </div>
    </div>
  );
}

function PreviewHeader({
  state,
  accent,
  accentSoft,
  progress,
  totalSteps,
  stepIndex,
  screenType,
  onClose,
  onBack,
  canGoBack,
}: {
  state: EditorState;
  accent: string;
  accentSoft: string;
  progress: number;
  totalSteps: number;
  stepIndex: number;
  screenType: Screen['type'];
  onClose: () => void;
  onBack: () => void;
  canGoBack: boolean;
}) {
  const isDark = isDarkBg(state.styling.appearance.backgroundColor);
  const headerColor = isDark ? '#F1F5F9' : '#0F172A';
  const mutedColor = isDark ? 'rgba(241,245,249,0.6)' : 'rgba(15,23,42,0.55)';

  return (
    <div
      className="flex flex-shrink-0 items-center justify-between border-b px-4 pb-3 pt-2"
      style={{
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)',
        background: state.styling.appearance.backgroundColor,
      }}
    >
      <div className="flex items-center gap-2">
        <CrossButton
          config={state.styling.crossButton}
          color={headerColor}
          onClick={onClose}
        />
        {canGoBack && (
          <button
            onClick={onBack}
            className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-black/5"
            aria-label="Go back"
            style={{ color: headerColor }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3.5L5 7l4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {state.styling.showProgress && (
          <ProgressIndicator
            style={state.styling.progressStyle}
            progress={progress}
            stepIndex={stepIndex}
            total={totalSteps}
            isFinal={screenType === 'thankyou'}
            accent={accent}
            accentSoft={accentSoft}
            color={headerColor}
            mutedColor={mutedColor}
          />
        )}
      </div>

      <div className="flex w-[60px] justify-end">
        <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: mutedColor }}>
          {screenType === 'thankyou' ? 'Done' : `${Math.min(stepIndex + 1, totalSteps)}/${totalSteps}`}
        </span>
      </div>
    </div>
  );
}

function ProgressIndicator({
  style,
  progress,
  stepIndex,
  total,
  isFinal,
  accent,
  accentSoft,
  color,
  mutedColor,
}: {
  style: 'bar' | 'dots' | 'numbers';
  progress: number;
  stepIndex: number;
  total: number;
  isFinal: boolean;
  accent: string;
  accentSoft: string;
  color: string;
  mutedColor: string;
}) {
  if (style === 'bar') {
    return (
      <div className="flex items-center gap-2">
        <div className="h-1 w-[80px] overflow-hidden rounded-full" style={{ background: accentSoft }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress * 100}%`,
              background: accent,
            }}
          />
        </div>
      </div>
    );
  }
  if (style === 'dots') {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full transition-colors"
            style={{
              background: i <= stepIndex && !isFinal ? accent : accentSoft,
            }}
          />
        ))}
      </div>
    );
  }
  return (
    <span className="text-[11px] font-semibold" style={{ color }}>
      {Math.min(stepIndex + 1, total)}<span style={{ color: mutedColor }}> / {total}</span>
    </span>
  );
}

function PreviewFooter({
  state,
  screen,
  accent,
  onContinue,
  selectedId,
  isFinal,
  onRestart,
}: {
  state: EditorState;
  screen: Screen;
  accent: string;
  onContinue: () => void;
  selectedId: string | null;
  isFinal: boolean;
  onRestart: () => void;
}) {
  const isDark = isDarkBg(state.styling.appearance.backgroundColor);
  const footerBg = state.styling.appearance.backgroundColor;
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)';
  const cta = state.styling.ctaStyle;

  const renderButton = (
    label: string,
    onClick: () => void,
    enabled: boolean,
    styleConfig: CtaStyleConfig,
  ) => {
    const baseStyle: React.CSSProperties = {
      height: styleConfig.height,
      width: styleConfig.fullWidth ? '100%' : `${styleConfig.width}%`,
      borderRadius: radiusToCss(styleConfig.radius),
      fontWeight: styleConfig.fontWeight,
      fontSize: styleConfig.fontSize,
      fontFamily: fontFamilyToCss(styleConfig.fontFamily),
      fontStyle: styleConfig.italic ? 'italic' : 'normal',
      textDecoration: styleConfig.underline ? 'underline' : 'none',
      textAlign: styleConfig.align,
      borderWidth: styleConfig.borderWidth,
      borderStyle: 'solid',
      borderColor: styleConfig.borderColor,
      marginTop: styleConfig.margin.top,
      marginRight: styleConfig.margin.right,
      marginBottom: styleConfig.margin.bottom,
      marginLeft: styleConfig.margin.left,
      transition: 'all 200ms',
    };

    if (state.styling.buttonStyle === 'outline') {
      return (
        <button
          onClick={enabled ? onClick : undefined}
          disabled={!enabled}
          className={cn('w-full select-none', !enabled && 'opacity-40')}
          style={{
            ...baseStyle,
            color: styleConfig.borderColor,
            background: 'transparent',
            cursor: enabled ? 'pointer' : 'not-allowed',
          }}
        >
          {label}
        </button>
      );
    }

    if (state.styling.buttonStyle === 'soft') {
      return (
        <button
          onClick={enabled ? onClick : undefined}
          disabled={!enabled}
          className={cn('w-full select-none', !enabled && 'opacity-60')}
          style={{
            ...baseStyle,
            color: styleConfig.borderColor,
            background: hexToRgba(styleConfig.backgroundColor, 0.12),
            cursor: enabled ? 'pointer' : 'not-allowed',
          }}
        >
          {label}
        </button>
      );
    }

    return (
      <button
        onClick={enabled ? onClick : undefined}
        disabled={!enabled}
        className={cn('w-full select-none', !enabled && 'opacity-40')}
        style={{
          ...baseStyle,
          color: styleConfig.textColor,
          background: styleConfig.backgroundColor,
          boxShadow: enabled ? `0 6px 16px ${hexToRgba(accent, 0.25)}` : 'none',
          cursor: enabled ? 'pointer' : 'not-allowed',
        }}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="phone-footer px-4 pb-4 pt-3" style={{ background: footerBg, borderColor }}>
      {screen.type === 'question' ? (
        <>
          {renderButton(
            state.questions.find((q) => q.id === screen.questionId)?.ctaText || 'Continue',
            onContinue,
            !!selectedId,
            cta,
          )}
          {!selectedId && (
            <p className="mt-2 text-center text-[11px]" style={{ color: isDark ? 'rgba(241,245,249,0.5)' : 'rgba(15,23,42,0.45)' }}>
              Select an option to continue
            </p>
          )}
        </>
      ) : (
        renderButton(state.thankYou.ctaText || 'Close', onRestart, true, state.styling.thankYouStyle.button)
      )}
    </div>
  );
}

function QuestionView({
  state,
  question,
  accent,
  accentSoft,
  selected,
  comment,
  onSelect,
  onCommentChange,
}: {
  state: EditorState;
  question: EditorState['questions'][number];
  accent: string;
  accentSoft: string;
  selected: string | null;
  comment: string;
  onSelect: (id: string) => void;
  onCommentChange: (v: string) => void;
}) {
  const title = state.styling.questionTitle;
  const subtitle = state.styling.subtitleStyle;
  const optionList = state.styling.optionList;
  const isDark = isDarkBg(state.styling.appearance.backgroundColor);
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)';

  return (
    <div className="space-y-5">
      <div
        style={{
          color: title.color,
          fontFamily: fontFamilyToCss(title.fontFamily),
          textAlign: title.align,
          marginTop: title.margin.top,
          marginRight: title.margin.right,
          marginBottom: title.margin.bottom,
          marginLeft: title.margin.left,
        }}
      >
        <h2
          className="leading-tight tracking-tight"
          style={{
            fontSize: `${title.fontSize}px`,
            fontWeight: title.fontWeight,
            fontStyle: title.italic ? 'italic' : 'normal',
            textDecoration: title.underline ? 'underline' : 'none',
          }}
        >
          {question.title}
        </h2>
        {question.subtitle && (
          <p
            className="mt-2 leading-relaxed"
            style={{
              color: subtitle.color,
              fontFamily: fontFamilyToCss(subtitle.fontFamily),
              fontSize: `${subtitle.fontSize}px`,
              fontWeight: subtitle.fontWeight,
              fontStyle: subtitle.italic ? 'italic' : 'normal',
              textDecoration: subtitle.underline ? 'underline' : 'none',
              textAlign: subtitle.align,
              marginTop: subtitle.margin.top,
              marginRight: subtitle.margin.right,
              marginBottom: subtitle.margin.bottom,
              marginLeft: subtitle.margin.left,
            }}
          >
            {question.subtitle}
          </p>
        )}
      </div>

      <div className="space-y-2.5">
        {question.options.map((opt) => {
          const isSelected = selected === opt.id;
          const stateStyle = isSelected ? state.styling.selectedOption : state.styling.unselectedOption;
          const bulletFill = optionList.mode === 'checkbox' ? 'square' : 'circle';
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={cn('flex w-full items-center text-left transition-all', isSelected ? 'option-pulse' : '')}
              style={{
                minHeight: `${optionList.optionHeight}px`,
                gap: `${optionList.bulletSpacing}px`,
                marginBottom: `${optionList.optionSpacing}px`,
                borderRadius: radiusToCss(optionList.borderRadius),
                borderStyle: 'solid',
                borderColor: isSelected ? stateStyle.borderColor : stateStyle.borderColor,
                borderWidth: `${stateStyle.borderWidth}px`,
                background: stateStyle.backgroundColor,
                color: stateStyle.textColor,
                fontFamily: fontFamilyToCss(stateStyle.fontFamily),
                fontSize: `${stateStyle.fontSize}px`,
                fontWeight: stateStyle.fontWeight,
                fontStyle: stateStyle.italic ? 'italic' : 'normal',
                textDecoration: stateStyle.underline ? 'underline' : 'none',
                textAlign: stateStyle.align,
                boxShadow: isSelected ? `0 4px 12px ${hexToRgba(accent, 0.12)}` : '0 1px 2px rgba(15,23,42,0.03)',
                backgroundColor: isSelected
                  ? stateStyle.backgroundColor
                  : stateStyle.backgroundColor,
                padding: '0 16px',
              }}
            >
              <span
                className="flex flex-shrink-0 items-center justify-center transition-all"
                style={{
                  width: optionList.bulletSpacing + 10,
                  height: optionList.bulletSpacing + 10,
                  borderRadius: bulletFill === 'square' ? 6 : '999px',
                  border: `1.5px solid ${isSelected ? stateStyle.borderColor : borderColor}`,
                  background: isSelected ? accent : 'transparent',
                }}
              >
                {isSelected && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d={optionList.mode === 'checkbox' ? 'M2 5l2 2 4-4.5' : 'M5 1.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7Z'}
                      stroke="#fff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="flex-1">{opt.label}</span>
            </button>
          );
        })}
      </div>

      {question.showComments && (
        <div className="space-y-1.5">
          <label
            className="block"
            style={{
              color: state.styling.commentStyle.textColor,
              fontFamily: fontFamilyToCss(state.styling.commentStyle.fontFamily),
              fontSize: `${state.styling.commentStyle.fontSize}px`,
              fontWeight: state.styling.commentStyle.fontWeight,
              fontStyle: state.styling.commentStyle.italic ? 'italic' : 'normal',
              textDecoration: state.styling.commentStyle.underline ? 'underline' : 'none',
              textAlign: state.styling.commentStyle.align,
            }}
          >
            {question.commentsLabel}
          </label>
          <textarea
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Type here…"
            rows={3}
            className="w-full resize-none rounded-md px-3 py-2.5 text-[13.5px] focus-ring"
            style={{
              background: state.styling.commentStyle.backgroundColor,
              border: `${state.styling.commentStyle.borderWidth}px solid ${state.styling.commentStyle.borderColor}`,
              color: state.styling.commentStyle.textColor,
              fontFamily: fontFamilyToCss(state.styling.commentStyle.fontFamily),
              fontSize: `${state.styling.commentStyle.fontSize}px`,
              fontWeight: state.styling.commentStyle.fontWeight,
              fontStyle: state.styling.commentStyle.italic ? 'italic' : 'normal',
              textDecoration: state.styling.commentStyle.underline ? 'underline' : 'none',
              textAlign: state.styling.commentStyle.align,
              borderRadius: Math.max(6, state.styling.buttonRadius - 4),
            }}
          />
        </div>
      )}
    </div>
  );
}

function ThankYouView({ state, accent }: { state: EditorState; accent: string }) {
  const isDark = isDarkBg(state.styling.appearance.backgroundColor);
  const title = state.styling.thankYouStyle.title;
  const subtitle = state.styling.thankYouStyle.subtitle;

  return (
    <div className="flex h-full flex-col items-center justify-center text-center" style={{ minHeight: 320 }}>
      {state.thankYou.mediaUrl ? (
        state.thankYou.mediaType === 'image' ? (
          <img
            src={state.thankYou.mediaUrl}
            alt=""
            className="mb-5 object-cover"
            style={{
              width: `${state.styling.thankYouStyle.imageWidth}px`,
              height: `${state.styling.thankYouStyle.imageHeight}px`,
              borderRadius: `${state.styling.thankYouStyle.imageRadius}px`,
              border: `${state.styling.thankYouStyle.imageBorderWidth}px solid ${state.styling.thankYouStyle.imageBorderColor}`,
              objectPosition: state.styling.thankYouStyle.imageAlign,
            }}
          />
        ) : (
          <div
            className="mb-5 flex items-center justify-center rounded-2xl bg-[var(--bg-subtle)] px-4 text-center"
            style={{
              width: `${state.styling.thankYouStyle.imageWidth}px`,
              height: `${state.styling.thankYouStyle.imageHeight}px`,
              borderRadius: `${state.styling.thankYouStyle.imageRadius}px`,
              border: `${state.styling.thankYouStyle.imageBorderWidth}px solid ${state.styling.thankYouStyle.imageBorderColor}`,
            }}
          >
            <div>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[var(--shadow-xs)]">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5 6.5h8M5 9h8M5 11.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="mt-2 text-[12px] font-medium text-[var(--text-primary)]">{state.thankYou.mediaName || 'Lottie animation'}</p>
            </div>
          </div>
        )
      ) : (
        <div
          className="mb-5 flex items-center justify-center rounded-2xl"
          style={{ width: 80, height: 80, background: hexToRgba(accent, 0.1) }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="16" fill={accent} fillOpacity="0.15" />
            <path d="M11 18l4 4 10-10" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      <h2
        style={{
          color: title.color,
          fontFamily: fontFamilyToCss(title.fontFamily),
          fontSize: `${title.fontSize}px`,
          fontWeight: title.fontWeight,
          fontStyle: title.italic ? 'italic' : 'normal',
          textDecoration: title.underline ? 'underline' : 'none',
          textAlign: title.align,
          marginTop: title.margin.top,
          marginRight: title.margin.right,
          marginBottom: title.margin.bottom,
          marginLeft: title.margin.left,
        }}
      >
        {state.thankYou.title}
      </h2>
      {state.thankYou.subtitle && (
        <p
          className="mt-3 max-w-[260px] leading-relaxed"
          style={{
            color: subtitle.color,
            fontFamily: fontFamilyToCss(subtitle.fontFamily),
            fontSize: `${subtitle.fontSize}px`,
            fontWeight: subtitle.fontWeight,
            fontStyle: subtitle.italic ? 'italic' : 'normal',
            textDecoration: subtitle.underline ? 'underline' : 'none',
            textAlign: subtitle.align,
            marginTop: subtitle.margin.top,
            marginRight: subtitle.margin.right,
            marginBottom: subtitle.margin.bottom,
            marginLeft: subtitle.margin.left,
          }}
        >
          {state.thankYou.subtitle}
        </p>
      )}
    </div>
  );
}

function CrossButton({
  config,
  color,
  onClick,
}: {
  config: CrossButtonStyleConfig;
  color: string;
  onClick: () => void;
}) {
  if (!config.enabled) return null;
  const size = config.size + 10;
  const style: React.CSSProperties = {
    width: size,
    height: size,
    marginTop: config.margin.top,
    marginRight: config.margin.right,
    marginBottom: config.margin.bottom,
    marginLeft: config.margin.left,
    background: config.variant === 'fill' ? config.fillColor : 'transparent',
    border: config.variant === 'stroke' ? `1.25px solid ${config.strokeColor}` : 'none',
    color: config.color || color,
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-md transition-colors hover:bg-black/5"
      aria-label="Close survey"
      style={style}
    >
      {config.customIconUrl ? (
        <img src={config.customIconUrl} alt="" className="h-full w-full object-contain" />
      ) : config.variant === 'fill' ? (
        <svg width={config.size} height={config.size} viewBox="0 0 14 14" fill="none">
          <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      ) : config.variant === 'stroke' ? (
        <svg width={config.size} height={config.size} viewBox="0 0 14 14" fill="none">
          <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width={config.size} height={config.size} viewBox="0 0 14 14" fill="none">
          <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

function radiusToCss(radius: CornerRadii): string {
  return `${radius.topLeft}px ${radius.topRight}px ${radius.bottomRight}px ${radius.bottomLeft}px`;
}

function isDarkBg(hex: string): boolean {
  const clean = hex.replace('#', '');
  if (clean.length !== 6 && clean.length !== 3) return false;
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.55;
}
