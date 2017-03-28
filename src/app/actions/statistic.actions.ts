import { Action } from '@ngrx/store';

import { type } from './action-helper';
import { Statistic } from '../models/statistic/statistic';

export const ActionTypes = {
  ADD: type('[SATATISTIC] Add'),
  ADD_SUCCESS: type('[SATATISTIC] Add Success'),
  ADD_FAIL: type('[SATATISTIC] Add Fail'),
};

export class AddAction implements Action {
  type = ActionTypes.ADD;

  constructor(public payload: Statistic) { }
}

export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;

  constructor(public payload: Statistic) { }
}

export class AddFailAction implements Action {
  type = ActionTypes.ADD_FAIL;

  constructor(public payload: string) { }
}


export type Actions
  = AddAction
  | AddSuccessAction
  | AddFailAction;

