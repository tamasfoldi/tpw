import { Action } from '@ngrx/store';

import { type } from './action-utils';
import { Lesson } from '../models/lessons/lesson';
import { Player } from '../models/player';

export const ActionTypes = {
  NEW_KEY: type('[LESSON] New Key'),

  LOAD: type('[LESSON] Load'),
  LOAD_SUCCESS: type('[LESSON] Load Success'),
  LOAD_FAIL: type('[LESSON] Load Fail'),

  CLEAR: type('[LESSON] Clear'),

  NEW_PLAYER: type('[LESSON] New Player'),

  READY: type('[LESSON] Ready'),

  NEW_PLAYER_PROGRESS: type('[LESSON] New Player Progress'),

  START: type('[LESSON] Start'),

  COUNT: type('[LESSON] Count'),

  END: type('[LESSON] End'),

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

export class NewPlayerAction implements Action {
  type = ActionTypes.NEW_PLAYER;
  payload: Player;

  constructor(palyerId: string) {
    this.payload = {
      id: palyerId,
      progress: 0,
      state: 'NOT_READY'
    };
  }
}

export class ReadyAction implements Action {
  type = ActionTypes.READY;

  constructor(public payload: string) { }
}

export class NewPlayerProgressAction implements Action {
  type = ActionTypes.NEW_PLAYER_PROGRESS;

  constructor(public payload: { id: string, progress: number }) { }
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
  = NewKeyAction
  | LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | ClearAction
  | CompleteAction
  | NewPlayerAction
  | ReadyAction
  | NewPlayerProgressAction
  | StartAction
  | EndAction
  | CountAction;

