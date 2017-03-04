// tslint:disable:no-switch-case-fall-through
import * as lesson from '../actions/lesson.actions';
import { Lesson } from '../models/lessons/lesson';

const KEYCODE_0 = 48;
const KEYCODE_Z = 98;
const KEYCODE_SPACE = 32;
export interface State {
  currentLesson: Lesson;
  typedText: string;
  isLoading: boolean;
};

export const initialState: State = {
  isLoading: false,
  currentLesson: null,
  typedText: ''
};

export function reducer(state = initialState, action: lesson.Actions): State {
  switch (action.type) {
    case lesson.ActionTypes.NEW_KEY: {
      const key: KeyboardEvent = action.payload as KeyboardEvent;
      if ((key.keyCode >= KEYCODE_0 && key.keyCode <= KEYCODE_Z) || key.keyCode === KEYCODE_SPACE) {
        return Object.assign({}, state, { typedText: state.typedText + key.key });
      } else {
        return state;
      }
    }

    case lesson.ActionTypes.LOAD: {
      return Object.assign({}, state, { isLoading: true });
    }

    case lesson.ActionTypes.LOAD_SUCCESS: {
      return Object.assign({}, state, { currentLesson: action.payload, isLoading: false });
    }

    case lesson.ActionTypes.LOAD_FAIL: {
      return Object.assign({}, state, { isLoading: false });
    }

    default: {
      return state;
    }
  }
}

export const getLessonTitle = (state: State) => state.currentLesson.title;
export const getLessonText = (state: State) => state.currentLesson.text;
export const getLessonId = (state: State) => state.currentLesson.id;
export const getCurrentLesson = (state: State) => state.currentLesson;
export const getTypedText = (state: State) => state.typedText;
