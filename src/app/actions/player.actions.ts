import { Action } from '@ngrx/store';

import { type } from './action-utils';
import { Lesson } from '../models/lessons/lesson';
import { Player } from '../models/player';

export const ActionTypes = {
  KEY: type('[PLAYER] New Key'),

  NEW: type('[PLAYER] New'),

  READY: type('[PLAYER] Ready'),

  PROGRESS: type('[PLAYER] New Progress')
};

export class KeyAction implements Action {
  type = ActionTypes.KEY;

  constructor(public payload: KeyboardEvent) { }
}

export class NewAction implements Action {
  type = ActionTypes.NEW;
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

export class ProgressAction implements Action {
  type = ActionTypes.PROGRESS;

  constructor(public payload: { id: string, progress: number }) { }
}



export type Actions
  = KeyAction
  | NewAction
  | ReadyAction
  | ProgressAction;

