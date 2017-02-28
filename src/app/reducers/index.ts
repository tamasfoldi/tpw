import { ActionReducer, combineReducers, Action } from '@ngrx/store';
import { compose } from '@ngrx/core';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import * as fromLesson from './lesson.reducer';
import { environment } from '../../environments/environment';
export interface State {
  lessons: fromLesson.State;
}

export const reducers = {
  lessons: fromLesson.reducer,
};

const developmentReducer: ActionReducer<State> = compose(combineReducers)(reducers);
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

export const getLessonList = createSelector(getLessonsState, fromLesson.getLessonList);

export const isLoadingLesson = createSelector(getLessonsState, fromLesson.isLoading);

export const getSelectedLesson = createSelector(getLessonsState, fromLesson.getSelectedLesson);
