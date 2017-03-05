// tslint:disable:no-switch-case-fall-through
import * as lesson from '../actions/lesson.actions';
import { Lesson } from '../models/lessons/lesson';
import { Statistic } from '../models/statistic/statistic';


const isItTheCorrectNextChar = (char: string, state: State): boolean => {
  const typedText = state.typedText;
  return typedText + char === state.currentLesson.text.substr(0, typedText.length + 1);
};

const isItCharacter = (keyCode: number): boolean => {
  const KEYCODE_0 = 48;
  const KEYCODE_Z = 98;
  const KEYCODE_SPACE = 32;
  return (keyCode >= KEYCODE_0 && keyCode <= KEYCODE_Z) || keyCode === KEYCODE_SPACE;
};


export interface State {
  currentLesson: Lesson;
  typedText: string;
  isLoading: boolean;
  statistic: Statistic;
};

export const initialState: State = {
  isLoading: false,
  currentLesson: null,
  typedText: '',
  statistic: new Statistic()
};

export function reducer(state = initialState, action: lesson.Actions): State {
  switch (action.type) {
    case lesson.ActionTypes.NEW_KEY: {
      const key: KeyboardEvent = action.payload as KeyboardEvent;

      if (isItCharacter(key.keyCode)) {
        let newStat = Object.assign({}, state.statistic) as Statistic;
        let newState = Object.assign({}, state) as State;

        if (isItTheCorrectNextChar(key.key, state)) {
          newState = Object.assign({}, state, { typedText: state.typedText + key.key });
          newStat = Object.assign({}, newStat, { nofCorrectPress: newStat.nofCorrectPress + 1 });

          if (state.typedText.length === 0) {
            newStat = Object.assign({}, newStat, { startTime: Date.now() });
          } else if (newState.typedText === state.currentLesson.text) {
            newStat = Object.assign({}, newStat, { endTime: Date.now() });
          }
        } else if (state.typedText.length !== 0) {
          newStat = Object.assign({}, newStat, { nofIncorrectPress: newStat.nofIncorrectPress + 1 });
        }
        return Object.assign(newState, { statistic: Object.assign({}, newStat) });
      }

      return state;

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
export const wasLessonTyped = (state: State) => state.typedText === state.currentLesson.text;
