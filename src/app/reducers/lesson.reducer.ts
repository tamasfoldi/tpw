// tslint:disable:no-switch-case-fall-through
import * as lesson from '../actions/lesson.actions';
import { LessonListElement } from '../models/lessons/lesson-list-element';

export interface State {
  lessonList: LessonListElement[];
  isLoading: boolean;
};

export const initialState: State = {
  lessonList: [],
  isLoading: false
};

export function reducer(state = initialState, action: lesson.Actions): State {
  switch (action.type) {
    case lesson.ActionTypes.LOAD_LIST: {
      return Object.assign({}, state, { isLoading: true });
    }

    case lesson.ActionTypes.LOAD_LIST_SUCCESS: {
      const lessonList = action.payload;

      return Object.assign({}, state, { lessonList: [...lessonList], isLoading: false });
    }

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
