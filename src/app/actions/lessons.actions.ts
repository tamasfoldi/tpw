import { Action } from '@ngrx/store';

import { type } from './action-helper';
import { LessonListElement } from '../../common/lesson-list-element';
import { Lesson } from '../../common/lesson';

export const ActionTypes = {
  LOAD_LIST: type('[LESSONS] Load List'),
  LOAD_LIST_SUCCESS: type('[LESSONS] Load List Success'),
  LOAD_LIST_FAIL: type('[LESSONS] Load List Fail'),

  SELECT: type('[LESSONS] Select')
};

export class LoadListAction implements Action {
  type = ActionTypes.LOAD_LIST;
  payload = null;
  constructor() { }
}

export class LoadListSuccessAction implements Action {
  type = ActionTypes.LOAD_LIST_SUCCESS;

  constructor(public payload: LessonListElement[]) { }
}

export class LoadListFailAction implements Action {
  type = ActionTypes.LOAD_LIST_FAIL;

  constructor(public payload: string) { }
}

export class SelectAction implements Action {
  type = ActionTypes.SELECT;

  constructor(public payload: string) { }
}

export type Actions
  = LoadListAction
  | LoadListSuccessAction
  | LoadListFailAction
  | SelectAction;
