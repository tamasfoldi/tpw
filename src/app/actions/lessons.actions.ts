import { Action } from '@ngrx/store';

import { type } from './action-helper';
import { LessonListElement } from '../../common/lesson-list-element';
import { Lesson } from '../../common/lesson';

export const ActionTypes = {
  LOAD_LIST: type('[LESSONS] Load List'),
  LOAD_LIST_SUCCESS: type('[LESSONS] Load List Success'),
  LOAD_LIST_FAIL: type('[LESSONS] Load List Fail'),

  SET_AVAIL: type('[LESSONS] Set Available'),
  SET_AVAIL_SUCCESS: type('[LESSONS] Set Available Success'),
  SET_AVAIL_FAIL: type('[LESSONS] Set Available Fail'),

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

export class SetAvailAction implements Action {
  type = ActionTypes.SET_AVAIL;
  constructor(public payload: string) { }
}

export class SetAvailSuccessAction implements Action {
  type = ActionTypes.SET_AVAIL_SUCCESS;

  constructor() { }
}

export class SetAvailFailAction implements Action {
  type = ActionTypes.SET_AVAIL_FAIL;

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
  | SetAvailAction
  | SetAvailSuccessAction
  | SetAvailFailAction
  | SelectAction;
