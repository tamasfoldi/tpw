// tslint:disable:no-switch-case-fall-through
import * as lesson from '../actions/lesson.actions';
import * as player from '../actions/player.actions';
import * as lessons from '../actions/lessons.actions';
import { Lesson } from '../models/lessons/lesson';
import { StatisticData, Statistic } from '../models/statistic/statistic';
import { Action } from '@ngrx/store';
import { Player } from '../models/player';


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
  isStarted: boolean;
  isEnded: boolean;
  isLoading: boolean;
  statistic: StatisticData;
  players: Player[];
};

export const initialState: State = {
  isLoading: false,
  isStarted: false,
  isEnded: false,
  currentLesson: null,
  typedText: '',
  statistic: new Statistic(),
  players: []
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case player.ActionTypes.KEY: {
      const key: KeyboardEvent = action.payload as KeyboardEvent;
      if (isItCharacterOrSpace(key.code)) {
        let newStat = Object.assign({}, state.statistic) as Statistic;
        let newState = Object.assign({}, state) as State;

        if (isItTheCorrectNextChar(key.key, state)) {
          newState = Object.assign({}, state, { typedText: state.typedText + key.key });
          newStat = Object.assign({}, newStat, { nofCorrectPress: newStat.nofCorrectPress + 1 });
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

    case player.ActionTypes.NEW: {
      return Object.assign({}, state, { players: [...state.players, action.payload] });
    }

    case player.ActionTypes.PROGRESS: {
      const pIdx = state.players.findIndex(p => p.id === action.payload.id);
      const newPlayers = [...state.players];
      newPlayers[pIdx] = Object.assign({}, newPlayers[pIdx], { progress: action.payload.progress });
      return Object.assign({}, state, { players: newPlayers });
    }

    case player.ActionTypes.READY: {
      const pIdx = state.players.findIndex(p => p.id === action.payload);
      const newPlayers = [...state.players];
      newPlayers[pIdx] = Object.assign({}, newPlayers[pIdx], { state: 'READY' });
      return Object.assign({}, state, { players: newPlayers });
    }

    case lesson.ActionTypes.START: {
      const newStat = Object.assign({}, state.statistic, { startTime: Date.now() }) as Statistic;
      return Object.assign({}, state, { isStarted: true, statistic: newStat });
    }

    case lesson.ActionTypes.END: {
      let newStat = Object.assign({}, state.statistic) as Statistic;
      if (state.statistic.endTime === -1) {
        newStat = Object.assign(newStat, { endTime: Date.now() });
      }
      return Object.assign({}, state, { isEnded: true, statistic: newStat });
    }

    default: {
      return state;
    }
  }
}


export const getLessonTitle = (state: State) => state.currentLesson ? state.currentLesson.title : null;
export const getLessonText = (state: State) => state.currentLesson ? state.currentLesson.text : null;
export const getLessonId = (state: State) => state.currentLesson ? state.currentLesson.id : null;
export const getLessonDifficulty = (state: State) => state.currentLesson ? state.currentLesson.difficulty : null;
export const getCurrentLesson = (state: State) => state.currentLesson;
export const getTypedText = (state: State) => state.typedText;
export const isStarted = (state: State) => state.isStarted;
export const isEnded = (state: State) => state.isEnded;
export const wasCompleted = (state: State) => state.currentLesson && state.typedText === state.currentLesson.text;
export const getStatistic = (state: State) => new Statistic(state.statistic);
export const getProgress = (state: State) => state.currentLesson &&
  Math.floor((state.typedText.length) / state.currentLesson.text.length * 100);
export const getEnemiesProgress = (state: State) => state.players
  .slice(1, state.players.length)
  .map(player => player.progress);
export const isAllPlayerReady = (state: State) => state.players.every(p => p.state === 'READY');
