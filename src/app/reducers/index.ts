import { ActionReducer, combineReducers, Action } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { storeLogger } from 'ngrx-store-logger';
import { createSelector } from 'reselect';

import * as fromLessons from './lessons.reducer';
import * as fromLesson from './lesson.reducer';
import { environment } from '../../environments/environment';
export interface State {
  lessons: fromLessons.State;
  lesson: fromLesson.State;
}

export const reducers = {
  lessons: fromLessons.reducer,
  lesson: fromLesson.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeLogger(), combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: State, action: Action) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const isLoading = (state: State) => state.lessons.isLoading;

/* -------- Lessons Selectors -------- */
export const getLessonsState = (state: State) => state.lessons;

export const getLessonList = createSelector(getLessonsState, fromLessons.getLessonList);

export const isLoadingLessons = createSelector(getLessonsState, fromLessons.isLoading);

/* -------- Lesson Selectors -------- */

export const getLessonState = (state: State) => state.lesson;

export const getCurrentLesson = createSelector(getLessonState, fromLesson.getCurrentLesson);
export const getCurrentLessonId = createSelector(getLessonState, fromLesson.getLessonId);
export const getCurrentLessonText = createSelector(getLessonState, fromLesson.getLessonText);
export const getCurrentLessonTitle = createSelector(getLessonState, fromLesson.getLessonTitle);
export const getTypedText = createSelector(getLessonState, fromLesson.getTypedText);
export const wasLessonTyped = createSelector(getLessonState, fromLesson.wasLessontyped);
