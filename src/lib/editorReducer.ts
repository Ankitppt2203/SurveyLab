import type { EditorAction, EditorState, SurveyQuestion } from '../types';
import { createBlankQuestion, createBlankCondition } from './defaults';

const MIN_OPTIONS = 2;

const updateQuestionInList = (
  questions: SurveyQuestion[],
  id: string,
  patch: Partial<SurveyQuestion>,
): SurveyQuestion[] =>
  questions.map((q) => (q.id === id ? { ...q, ...patch } : q));

export const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case 'SET_SURVEY_NAME':
      return { ...state, surveyName: action.payload };

    case 'SET_QUESTION_COUNT': {
      const target = Math.max(1, Math.min(15, Math.round(action.payload)));
      if (target === state.questions.length) return state;
      if (target > state.questions.length) {
        const extras: SurveyQuestion[] = [];
        for (let i = state.questions.length; i < target; i += 1) {
          extras.push(createBlankQuestion(i));
        }
        return { ...state, questions: [...state.questions, ...extras] };
      }
      return { ...state, questions: state.questions.slice(0, target) };
    }

    case 'ADD_QUESTION': {
      return {
        ...state,
        questions: [...state.questions, createBlankQuestion(state.questions.length)],
      };
    }

    case 'INSERT_QUESTION': {
      return {
        ...state,
        questions: [...state.questions, action.payload.question],
      };
    }

    case 'DELETE_QUESTION': {
      if (state.questions.length <= 1) return state;
      const questions = state.questions.filter((q) => q.id !== action.payload.id);
      if (questions.length === state.questions.length) return state;
      const remainingIds = new Set(questions.map((q) => q.id));
      return {
        ...state,
        questions,
        conditions: state.conditions.filter(
          (cond) =>
            remainingIds.has(cond.ifQuestionId) &&
            remainingIds.has(cond.thenQuestionId),
        ),
      };
    }

    case 'UPDATE_QUESTION':
      return {
        ...state,
        questions: updateQuestionInList(state.questions, action.payload.id, action.payload.patch),
      };

    case 'ADD_OPTION': {
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id !== action.payload.questionId) return q;
          const nextIndex = q.options.length + 1;
          return {
            ...q,
            options: [...q.options, { id: `opt_${Date.now()}_${nextIndex}`, label: `Option ${nextIndex}` }],
          };
        }),
      };
    }

    case 'UPDATE_OPTION':
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id !== action.payload.questionId) return q;
          return {
            ...q,
            options: q.options.map((opt) =>
              opt.id === action.payload.optionId ? { ...opt, label: action.payload.label } : opt,
            ),
          };
        }),
      };

    case 'DELETE_OPTION':
      return {
        ...state,
        questions: state.questions.map((q) => {
          if (q.id !== action.payload.questionId) return q;
          if (q.options.length <= MIN_OPTIONS) return q;
          return { ...q, options: q.options.filter((opt) => opt.id !== action.payload.optionId) };
        }),
      };

    case 'TOGGLE_COMMENTS':
      return {
        ...state,
        questions: state.questions.map((q) =>
          q.id === action.payload.questionId ? { ...q, showComments: !q.showComments } : q,
        ),
      };

    case 'ADD_CONDITION':
      return { ...state, conditions: [...state.conditions, createBlankCondition()] };

    case 'UPDATE_CONDITION':
      return {
        ...state,
        conditions: state.conditions.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload.patch } : c,
        ),
      };

    case 'DELETE_CONDITION':
      return {
        ...state,
        conditions: state.conditions.filter((c) => c.id !== action.payload.id),
      };

    case 'TOGGLE_THANKYOU':
      return {
        ...state,
        thankYou: { ...state.thankYou, enabled: !state.thankYou.enabled },
      };

    case 'UPDATE_THANKYOU':
      return { ...state, thankYou: { ...state.thankYou, ...action.payload } };

    case 'UPDATE_STYLING':
      return { ...state, styling: { ...state.styling, ...action.payload } };

    default:
      return state;
  }
};

export { MIN_OPTIONS };
