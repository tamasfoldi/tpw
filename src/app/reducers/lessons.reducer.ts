// tslint:disable:no-switch-case-fall-through
import * as lessons from '../actions/lessons.actions';
import { LessonListElement } from '../models/lessons/lesson-list-element';
import { Lesson } from '../models/lessons/lesson';

export interface State {
  lessonList: LessonListElement[];
  isLoading: boolean;
};

export const initialState: State = {
  lessonList: [],
  isLoading: false
};

export function reducer(state = initialState, action: lessons.Actions): State {
  switch (action.type) {
    case lessons.ActionTypes.LOAD_LIST: {
      return Object.assign({}, state, { isLoading: true });
    }

    case lessons.ActionTypes.LOAD_LIST_SUCCESS: {
      const lessonList = action.payload;

      return Object.assign({}, state, { lessonList: [...lessonList], isLoading: false });
    }

    case lessons.ActionTypes.LOAD_LIST_FAIL: {
      return Object.assign({}, state, { isLoading: false });
    }

    default: {
      return state;
    }
  }
}

export const getLessonList = (state: State) => state.lessonList;

export const isLoading = (state: State) => state.isLoading;
