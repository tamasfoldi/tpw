import { ActionReducer, combineReducers, Action } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { storeLogger } from 'ngrx-store-logger';
import { createSelector } from 'reselect';

import * as fromLessons from './lessons.reducer';
import * as fromLesson from './lesson.reducer';
import * as fromRouter from './router.reducer';
import { environment } from '../../environments/environment';
export interface State {
  lessons: fromLessons.State;
  lesson: fromLesson.State;
  // router: string;
}

export const reducers = {
  lessons: fromLessons.reducer,
  lesson: fromLesson.reducer,
  // router: fromRouter.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeLogger(), combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: State, action: Action) {
  if (environment.production) {
    /* istanbul ignore next */
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

/* -------- Lessons Selectors -------- */
/* istanbul ignore next */
export const getLessonsState = (state: State) => state.lessons;

export const getLessonList = createSelector(getLessonsState, fromLessons.getLessonList);

export const isLoadingLessons = createSelector(getLessonsState, fromLessons.isLoading);

/* -------- Lesson Selectors -------- */

/* istanbul ignore next */
export const getLessonState = (state: State) => state.lesson;

export const getCurrentLesson = createSelector(getLessonState, fromLesson.getCurrentLesson);
export const getCurrentLessonId = createSelector(getLessonState, fromLesson.getLessonId);
export const getCurrentLessonText = createSelector(getLessonState, fromLesson.getLessonText);
export const getCurrentLessonTitle = createSelector(getLessonState, fromLesson.getLessonTitle);
export const getCurrentLessonDifficulty = createSelector(getLessonState, fromLesson.getLessonDifficulty);
export const getTypedText = createSelector(getLessonState, fromLesson.getTypedText);
export const isLessonStarted = createSelector(getLessonState, fromLesson.isStarted);
export const isLessonEnded = createSelector(getLessonState, fromLesson.isEnded);
export const wasLessonCompleted = createSelector(getLessonState, fromLesson.wasCompleted);
export const getLessonStatistic = createSelector(getLessonState, fromLesson.getStatistic);
export const getLessonProgress = createSelector(getLessonState, fromLesson.getProgress);
export const getLessonEnemiesProgress = createSelector(getLessonState, fromLesson.getEnemiesProgress);
export const isAllPlayerReady = createSelector(getLessonState, fromLesson.isAllPlayerReady);
