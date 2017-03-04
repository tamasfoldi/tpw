import { ActionReducer, combineReducers, Action } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { storeLogger } from 'ngrx-store-logger';
import { createSelector } from 'reselect';

import * as fromLessons from './lessons.reducer';
import { environment } from '../../environments/environment';
export interface State {
  lessons: fromLessons.State;
}

export const reducers = {
  lessons: fromLessons.reducer,
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
export const getLessonsState = (state: State) => state.lessons;

export const getLessonList = createSelector(getLessonsState, fromLessons.getLessonList);

export const isLoadingLesson = createSelector(getLessonsState, fromLessons.isLoading);


