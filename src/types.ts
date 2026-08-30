// Core data model for the Survey Campaign Builder editor.
// All UI state lives here and propagates to the live mobile preview.

export interface SurveyOption {
  id: string;
  label: string;
}

export interface SurveyQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: SurveyOption[];
  showComments: boolean;
  commentsLabel: string;
  ctaText: string;
}

export interface ConditionalRule {
  id: string;
  ifQuestionId: string;
  ifOptionId: string;
  thenQuestionId: string;
}

export type RedirectOption = 'home' | 'url' | 'close' | 'survey';
export type TextAlign = 'left' | 'center' | 'right';
export type OptionLayout = 'outlined' | 'filled';
export type OptionMode = 'radio' | 'checkbox';
export type CrossButtonVariant = 'x' | 'fill' | 'stroke';

export interface BoxEdges {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface CornerRadii {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

export interface TextStyleConfig {
  color: string;
  fontFamily: FontFamily;
  fontSize: number;
  fontWeight: number;
  italic: boolean;
  underline: boolean;
  align: TextAlign;
  margin: BoxEdges;
}

export interface AppearanceStyleConfig {
  backgroundColor: string;
  borderRadius: CornerRadii;
  displayDelay: number;
  backdropColor: string;
  backdropOpacity: number;
}

export interface OptionListStyleConfig {
  mode: OptionMode;
  layout: OptionLayout;
  optionHeight: number;
  bulletSpacing: number;
  optionSpacing: number;
  borderRadius: CornerRadii;
}

export interface OptionStateStyleConfig {
  borderColor: string;
  textColor: string;
  backgroundColor: string;
  borderWidth: number;
  fontFamily: FontFamily;
  fontSize: number;
  fontWeight: number;
  italic: boolean;
  underline: boolean;
  align: TextAlign;
}

export interface CtaStyleConfig {
  fullWidth: boolean;
  borderColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: FontFamily;
  fontSize: number;
  fontWeight: number;
  italic: boolean;
  underline: boolean;
  height: number;
  width: number;
  borderWidth: number;
  radius: CornerRadii;
  align: TextAlign;
  margin: BoxEdges;
}

export interface CrossButtonStyleConfig {
  enabled: boolean;
  variant: CrossButtonVariant;
  customIconUrl: string | null;
  color: string;
  fillColor: string;
  strokeColor: string;
  size: number;
  margin: BoxEdges;
}

export interface ThankYouStyleConfig {
  title: TextStyleConfig;
  subtitle: TextStyleConfig;
  imageWidth: number;
  imageHeight: number;
  imageRadius: number;
  imageBorderColor: string;
  imageBorderWidth: number;
  imageAlign: TextAlign;
  button: CtaStyleConfig;
}

export interface ThankYouConfig {
  enabled: boolean;
  mediaUrl: string | null;
  mediaType: 'image' | 'lottie' | 'none';
  mediaName: string | null;
  title: string;
  subtitle: string;
  ctaText: string;
  redirect: RedirectOption;
  redirectUrl: string;
}

export type FontFamily = 'Inter' | 'System' | 'Roboto' | 'Plus Jakarta';
export type ButtonStyle = 'solid' | 'outline' | 'soft';
export type ProgressStyle = 'bar' | 'dots' | 'numbers';

export interface StylingConfig {
  accentColor: string;
  bgColor: string;
  fontFamily: FontFamily;
  fontSize: number;
  buttonRadius: number;
  buttonStyle: ButtonStyle;
  pagePadding: number;
  showProgress: boolean;
  progressStyle: ProgressStyle;
  appearance: AppearanceStyleConfig;
  questionTitle: TextStyleConfig;
  subtitleStyle: TextStyleConfig;
  optionList: OptionListStyleConfig;
  selectedOption: OptionStateStyleConfig;
  unselectedOption: OptionStateStyleConfig;
  commentStyle: OptionStateStyleConfig;
  ctaStyle: CtaStyleConfig;
  crossButton: CrossButtonStyleConfig;
  thankYouStyle: ThankYouStyleConfig;
}

export interface EditorState {
  surveyName: string;
  questions: SurveyQuestion[];
  conditions: ConditionalRule[];
  thankYou: ThankYouConfig;
  styling: StylingConfig;
}

export type EditorAction =
  | { type: 'SET_SURVEY_NAME'; payload: string }
  | { type: 'SET_QUESTION_COUNT'; payload: number }
  | { type: 'ADD_QUESTION' }
  | { type: 'INSERT_QUESTION'; payload: { question: SurveyQuestion } }
  | { type: 'DELETE_QUESTION'; payload: { id: string } }
  | { type: 'UPDATE_QUESTION'; payload: { id: string; patch: Partial<SurveyQuestion> } }
  | { type: 'ADD_OPTION'; payload: { questionId: string } }
  | { type: 'UPDATE_OPTION'; payload: { questionId: string; optionId: string; label: string } }
  | { type: 'DELETE_OPTION'; payload: { questionId: string; optionId: string } }
  | { type: 'TOGGLE_COMMENTS'; payload: { questionId: string } }
  | { type: 'ADD_CONDITION' }
  | { type: 'UPDATE_CONDITION'; payload: { id: string; patch: Partial<ConditionalRule> } }
  | { type: 'DELETE_CONDITION'; payload: { id: string } }
  | { type: 'TOGGLE_THANKYOU' }
  | { type: 'UPDATE_THANKYOU'; payload: Partial<ThankYouConfig> }
  | { type: 'UPDATE_STYLING'; payload: Partial<StylingConfig> };
