// tslint:disable:no-switch-case-fall-through
import * as lesson from '../actions/lesson.actions';
import { Lesson } from '../models/lessons/lesson';
import { StatisticData, Statistic } from '../models/statistic/statistic';
import { Action } from '@ngrx/store';


const isItTheCorrectNextChar = (char: string, state: State): boolean => {
  const typedText = state.typedText;
  return typedText + char === state.currentLesson.text.substr(0, typedText.length + 1);
};

const isItCharacterOrSpace = (code: string): boolean => {
  return code.includes('Key') || code === 'Space';
};


export interface State {
  currentLesson: Lesson;
  typedText: string;
  isLoading: boolean;
  progress: number;
  statistic: StatisticData;
};

export const initialState: State = {
  isLoading: false,
  currentLesson: null,
  typedText: '',
  progress: -1,
  statistic: new Statistic()
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case lesson.ActionTypes.NEW_KEY: {
      const key: KeyboardEvent = action.payload as KeyboardEvent;
      if (isItCharacterOrSpace(key.code)) {
        let newStat = Object.assign({}, state.statistic) as Statistic;
        let newState = Object.assign({}, state) as State;

        if (isItTheCorrectNextChar(key.key, state)) {
          newState = Object.assign({}, state, {
            typedText: state.typedText + key.key,
            progress: Math.floor((state.typedText.length + 1) / state.currentLesson.text.length * 100)
          });
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

    case lesson.ActionTypes.CLEAR: {
      return Object.assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}


export const getLessonTitle = (state: State) => state.currentLesson ? state.currentLesson.title : null;
export const getLessonText = (state: State) => state.currentLesson ? state.currentLesson.text : null;
export const getLessonId = (state: State) => state.currentLesson ? state.currentLesson.id : null;
export const getCurrentLesson = (state: State) => state.currentLesson;
export const getTypedText = (state: State) => state.typedText;
export const wasLessonTyped = (state: State) => state.currentLesson && state.typedText === state.currentLesson.text;
export const getStatistic = (state: State) => new Statistic(state.statistic);
export const getProgress = (state: State) => state.progress;
