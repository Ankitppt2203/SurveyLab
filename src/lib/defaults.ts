import type {
  EditorState,
  SurveyQuestion,
  SurveyOption,
  ConditionalRule,
  BoxEdges,
  CornerRadii,
  TextStyleConfig,
  AppearanceStyleConfig,
  OptionListStyleConfig,
  OptionStateStyleConfig,
  CtaStyleConfig,
  CrossButtonStyleConfig,
  ThankYouStyleConfig,
} from '../types';

export const ACCENT = '#5B5BD6';
const DEFAULT_BG = '#FFFFFF';

const box = (top: number, right: number, bottom: number, left: number): BoxEdges => ({
  top,
  right,
  bottom,
  left,
});

const radii = (topLeft: number, topRight: number, bottomRight: number, bottomLeft: number): CornerRadii => ({
  topLeft,
  topRight,
  bottomRight,
  bottomLeft,
});

const textStyle = (overrides: Partial<TextStyleConfig> = {}): TextStyleConfig => ({
  color: '#0F172A',
  fontFamily: 'Inter',
  fontSize: 15,
  fontWeight: 600,
  italic: false,
  underline: false,
  align: 'left',
  ...overrides,
  margin: overrides.margin ?? box(0, 0, 0, 0),
});

const optionStateStyle = (overrides: Partial<OptionStateStyleConfig> = {}): OptionStateStyleConfig => ({
  borderColor: '#D1D5DB',
  textColor: '#0F172A',
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  fontFamily: 'Inter',
  fontSize: 14,
  fontWeight: 500,
  italic: false,
  underline: false,
  align: 'left',
  ...overrides,
});

const ctaStyle = (overrides: Partial<CtaStyleConfig> = {}): CtaStyleConfig => ({
  fullWidth: true,
  borderColor: ACCENT,
  textColor: '#FFFFFF',
  backgroundColor: ACCENT,
  fontFamily: 'Inter',
  fontSize: 15,
  fontWeight: 600,
  italic: false,
  underline: false,
  height: 48,
  width: 100,
  borderWidth: 0,
  radius: radii(12, 12, 12, 12),
  align: 'center',
  margin: box(0, 0, 0, 0),
  ...overrides,
});

let _idCounter = 0;
export const uid = (prefix = 'id') => {
  _idCounter += 1;
  return `${prefix}_${Date.now().toString(36)}_${_idCounter.toString(36)}`;
};

const makeOptions = (labels: string[]): SurveyOption[] =>
  labels.map((label) => ({ id: uid('opt'), label }));

const makeQuestion = (
  title: string,
  subtitle: string,
  optionLabels: string[],
  ctaText: string,
  showComments = false,
): SurveyQuestion => ({
  id: uid('q'),
  title,
  subtitle,
  options: makeOptions(optionLabels),
  showComments,
  commentsLabel: 'Anything else you would like to share?',
  ctaText,
});

export const createInitialState = (): EditorState => ({
  surveyName: 'Customer Feedback Survey',
  questions: [
    makeQuestion(
      'How satisfied are you with our product?',
      'Your feedback helps us improve the experience for everyone.',
      ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
      'Continue',
      false,
    ),
    makeQuestion(
      'Which feature do you use the most?',
      'Pick the one you find most valuable in your daily workflow.',
      ['Dashboard', 'Reports', 'Integrations', 'Notifications', 'Other'],
      'Continue',
      true,
    ),
    makeQuestion(
      'How likely are you to recommend us to a friend?',
      'On a scale from 0 (not at all) to 10 (extremely likely).',
      ['0 – 3', '4 – 6', '7 – 8', '9 – 10'],
      'Submit',
      true,
    ),
  ],
  conditions: [],
  thankYou: {
    enabled: true,
    mediaUrl: null,
    mediaType: 'none',
    mediaName: null,
    title: 'Thank you!',
    subtitle: 'Your responses have been recorded. We truly appreciate your time.',
    ctaText: 'Close',
    redirect: 'close',
    redirectUrl: '',
  },
  styling: {
    accentColor: ACCENT,
    bgColor: DEFAULT_BG,
    fontFamily: 'Inter',
    fontSize: 15,
    buttonRadius: 12,
    buttonStyle: 'solid',
    pagePadding: 20,
    showProgress: true,
    progressStyle: 'bar',
    appearance: {
      backgroundColor: DEFAULT_BG,
      borderRadius: radii(30, 30, 30, 30),
      displayDelay: 0,
      backdropColor: '#0F172A',
      backdropOpacity: 0.55,
    },
    questionTitle: textStyle({
      color: '#0F172A',
      fontFamily: 'Inter',
      fontSize: 20,
      fontWeight: 700,
      align: 'left',
    }),
    subtitleStyle: textStyle({
      color: '#475569',
      fontFamily: 'Inter',
      fontSize: 13,
      fontWeight: 400,
      align: 'left',
    }),
    optionList: {
      mode: 'radio',
      layout: 'outlined',
      optionHeight: 54,
      bulletSpacing: 12,
      optionSpacing: 10,
      borderRadius: radii(14, 14, 14, 14),
    },
    selectedOption: optionStateStyle({
      borderColor: ACCENT,
      textColor: '#0F172A',
      backgroundColor: '#EEEEFE',
      borderWidth: 2,
      fontWeight: 600,
    }),
    unselectedOption: optionStateStyle({
      borderColor: '#D1D5DB',
      textColor: '#0F172A',
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      fontWeight: 500,
    }),
    commentStyle: optionStateStyle({
      borderColor: '#D1D5DB',
      textColor: '#0F172A',
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      fontWeight: 400,
    }),
    ctaStyle: ctaStyle(),
    crossButton: {
      enabled: true,
      variant: 'x',
      customIconUrl: null,
      color: '#0F172A',
      fillColor: '#FFFFFF',
      strokeColor: '#0F172A',
      size: 14,
      margin: box(0, 0, 0, 0),
    },
    thankYouStyle: {
      title: textStyle({
        color: '#0F172A',
        fontFamily: 'Inter',
        fontSize: 22,
        fontWeight: 700,
        align: 'center',
      }),
      subtitle: textStyle({
        color: '#475569',
        fontFamily: 'Inter',
        fontSize: 13,
        fontWeight: 400,
        align: 'center',
      }),
      imageWidth: 180,
      imageHeight: 180,
      imageRadius: 16,
      imageBorderColor: '#E4E7EC',
      imageBorderWidth: 0,
      imageAlign: 'center',
      button: ctaStyle({
        fullWidth: true,
        width: 100,
        height: 48,
        radius: radii(12, 12, 12, 12),
      }),
    },
  },
});

export const createBlankQuestion = (index: number): SurveyQuestion => ({
  id: uid('q'),
  title: `Question ${index + 1}`,
  subtitle: 'Add a short description to help respondents understand.',
  options: makeOptions(['Option 1', 'Option 2']),
  showComments: false,
  commentsLabel: 'Additional comments',
  ctaText: index === 0 ? 'Continue' : 'Continue',
});

export const createBlankCondition = (): ConditionalRule => ({
  id: uid('cond'),
  ifQuestionId: '',
  ifOptionId: '',
  thenQuestionId: '',
});
