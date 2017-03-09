import { Action } from '@ngrx/store';

import { type } from './action-utils';
import { Lesson } from '../models/lessons/lesson';

export const ActionTypes = {
  NEW_KEY: type('[LESSON] New Key'),

  LOAD: type('[LESSON] Load'),
  LOAD_SUCCESS: type('[LESSON] Load Success'),
  LOAD_FAIL: type('[LESSON] Load Fail'),

  CLEAR: type('[LESSON] Clear'),

  COMPLETE: type('[LESSON] Complete')
};

export class NewKeyAction implements Action {
  type = ActionTypes.NEW_KEY;

  constructor(public payload: KeyboardEvent) { }
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

  constructor(public payload: string) { }
}

export class ClearAction implements Action {
  type = ActionTypes.CLEAR;

  constructor(public payload?: void) { }
}

export class CompleteAction implements Action {
  type = ActionTypes.COMPLETE;

  constructor(public payload: string) { }
}

export type Actions
  = NewKeyAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | ClearAction
  | CompleteAction;

