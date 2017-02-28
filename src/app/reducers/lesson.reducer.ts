// tslint:disable:no-switch-case-fall-through
import * as lesson from '../actions/lesson.actions';
import { LessonListElement } from '../models/lessons/lesson-list-element';
import { Lesson } from '../models/lessons/lesson';

export interface State {
  lessonList: LessonListElement[];
  isLoading: boolean;
  selectedLesson: Lesson;
  lastCompletedIdx: number;
};

export const initialState: State = {
  lessonList: [],
  isLoading: false,
  selectedLesson: null,
  lastCompletedIdx: 0
};

export function reducer(state = initialState, action: lesson.Actions): State {
  switch (action.type) {
    case lesson.ActionTypes.LOAD:
    case lesson.ActionTypes.LOAD_LIST: {
      return Object.assign({}, state, { isLoading: true });
    }

    case lesson.ActionTypes.LOAD_LIST_SUCCESS: {
      const lessonList = action.payload;

      return Object.assign({}, state, { lessonList: [...lessonList], isLoading: false });
    }

    case lesson.ActionTypes.LOAD_SUCCESS: {
      const lesson = action.payload;

      return Object.assign({}, state, { selectedLesson: lesson, isLoading: false });
    }

    case lesson.ActionTypes.LOAD_FAIL:
    case lesson.ActionTypes.LOAD_LIST_FAIL: {
      return Object.assign({}, state, { isLoading: false });
    }

    default: {
      return state;
    }
  }
}

export const getLessonList = (state: State) => state.lessonList;

export const isLoading = (state: State) => state.isLoading;

export const getSelectedLesson = (state: State) => state.selectedLesson;

export const getLastCompletedIdx = (state: State) => state.lastCompletedIdx;
