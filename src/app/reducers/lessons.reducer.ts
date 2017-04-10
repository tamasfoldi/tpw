// tslint:disable:no-switch-case-fall-through
import * as lessons from '../actions/lessons.actions';
import * as lesson from '../actions/lesson.actions';
import { LessonListElement } from '../../common/lesson-list-element';
import { Lesson } from '../../common/lesson';
import { Action } from '@ngrx/store';

export interface State {
  lessonList: LessonListElement[];
  isLoading: boolean;
};

export const initialState: State = {
  lessonList: [],
  isLoading: false
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case lessons.ActionTypes.SET_AVAIL:
    case lessons.ActionTypes.LOAD_LIST: {
      return Object.assign({}, state, { isLoading: true });
    }

    case lessons.ActionTypes.SET_AVAIL_FAIL:
    case lessons.ActionTypes.LOAD_LIST_FAIL: {
      return Object.assign({}, state, { isLoading: false });
    }

    case lessons.ActionTypes.LOAD_LIST_SUCCESS: {
      const lessonList = action.payload;

      return Object.assign({}, state, { lessonList: [...lessonList], isLoading: false });
    }

    case lessons.ActionTypes.SET_AVAIL_SUCCESS: {
      const lessonId = action.payload;
      const lessonList = [...state.lessonList];
      const nextListId = lessonList.findIndex(l => l.id === lessonId) + 1;
      if (nextListId <= lessonList.length - 1) {
        lessonList[nextListId] = Object.assign({}, lessonList[nextListId], { isAvailable: true });
      }

      return Object.assign({}, state, { isLoading: false, lessonList: lessonList });
    }

    default: {
      return state;
    }
  }
}

export const getLessonList = (state: State) => state.lessonList;

export const isLoading = (state: State) => state.isLoading;
