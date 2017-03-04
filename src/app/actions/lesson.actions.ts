import { Action } from '@ngrx/store';

import { type } from './action-utils';

export const ActionTypes = {
  NEW_KEY: type('[LESSON] New Key'),
};

export class NewKeyAction implements Action {
  type = ActionTypes.NEW_KEY;

  constructor(public payload: KeyboardEvent) { }
}

export type Actions
  = NewKeyAction;

