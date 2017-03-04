import { RouterStateSnapshot, NavigationCancel, RoutesRecognized, NavigationError } from '@angular/router';
import { Action } from '@ngrx/store';

import { type } from './action-utils';
import { State } from '../reducers/index';
import { LessonListElement } from '../models/lessons/lesson-list-element';
import { Lesson } from '../models/lessons/lesson';

export const ActionTypes = {
  LOAD_LIST: type('[LESSON] Load List'),
  LOAD_LIST_SUCCESS: type('[LESSON] Load List Success'),
  LOAD_LIST_FAIL: type('[LESSON] Load List Fail'),

  LOAD: type('[LESSON] Load'),
  LOAD_SUCCESS: type('[LESSON] Load Success'),
  LOAD_FAIL: type('[LESSON] Load Fail'),

  NEW_KEY: type('[LESSON] New Key'),
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

export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: string) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Lesson) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload?: string) { }
}

export class NewKeyAction implements Action {
  type = ActionTypes.NEW_KEY;

  constructor(public payload: KeyboardEvent) { }
}

export type Actions
  = LoadListAction
  | LoadListSuccessAction
  | LoadListFailAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | NewKeyAction;
