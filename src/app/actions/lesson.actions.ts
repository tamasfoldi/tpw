import { Action } from '@ngrx/store';

import { type } from './action-helper';
import { Lesson } from '../../common/lesson';
import { Player } from '../../common/player';

export const ActionTypes = {
  LOAD: type('[LESSON] Load'),
  LOAD_SUCCESS: type('[LESSON] Load Success'),
  LOAD_FAIL: type('[LESSON] Load Fail'),

  CLEAR: type('[LESSON] Clear'),

  START: type('[LESSON] Start'),

  COUNT: type('[LESSON] Count'),

  END: type('[LESSON] End'),

  COMPLETE: type('[LESSON] Complete')
};

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

export class StartAction implements Action {
  type = ActionTypes.START;

  constructor(public payload?: void) { }
}

export class CountAction implements Action {
  type = ActionTypes.COUNT;

  constructor(public payload: number) { }
}

export class EndAction implements Action {
  type = ActionTypes.END;

  constructor(public payload?: void) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | ClearAction
  | CompleteAction
  | StartAction
  | EndAction
  | CountAction;

