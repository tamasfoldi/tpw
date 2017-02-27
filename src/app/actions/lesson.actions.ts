import { RouterStateSnapshot, NavigationCancel, RoutesRecognized, NavigationError } from '@angular/router';
import { Action } from '@ngrx/store';

import { type } from './action-utils';
import { State } from '../reducers/index';
import { LessonListElement } from '../models/lessons/lesson-list-element';

export const ActionTypes = {
  LOAD_LIST: type('[LESSON] Load List'),
  LOAD_LIST_SUCCESS: type('[LESSON] Load List Success'),
  LOAD_LIST_FAIL: type('[LESSON] Load List Fail'),
};

export class LoadListAction implements Action {
  type = ActionTypes.LOAD_LIST;
  payload = null;
  constructor() { }
}

export class LoadListSuccessAction implements Action {
  type = ActionTypes.LOAD_LIST_SUCCESS;

  constructor(public payload?: LessonListElement[]) { }
}

export class LoadListFailAction implements Action {
  type = ActionTypes.LOAD_LIST_FAIL;

  constructor(public payload?: string) { }
}

export type Actions
  = LoadListAction
  | LoadListSuccessAction
  | LoadListFailAction;
