import { RouterStateSnapshot, NavigationCancel, RoutesRecognized, NavigationError } from '@angular/router';
import { Action } from '@ngrx/store';

import { type } from './action-utils';
import { State } from '../reducers/index';

export const ActionTypes = {
  NAVIGATION: type('[ROUTER] Navigation'),
  CANCEL: type('[ROUTER] Cancel'),
  ERROR: type('[ROUTER] Error'),
};

/**
 * Payload of NAVIGATION.
 */
export interface RouterNavigationPayload {
  routerState: RouterStateSnapshot;
  event: RoutesRecognized;
}

/**
 * Payload of CANCEL.
 */
export interface RouterCancelPayload<T> {
  routerState: RouterStateSnapshot;
  storeState: T;
  event: NavigationCancel;
};

/**
 * Payload of ERROR.
 */
export interface RouterErrorPayload<T> {
  routerState: RouterStateSnapshot;
  storeState: T;
  event: NavigationError;
};

export class NavigationAction implements Action {
  type = ActionTypes.NAVIGATION;

  constructor(public payload: RouterNavigationPayload) { }
}

export class CancelAction implements Action {
  type = ActionTypes.CANCEL;

  constructor(public payload: RouterCancelPayload<State>) { }
}

export class ErrorAction implements Action {
  type = ActionTypes.ERROR;

  constructor(public payload: RouterErrorPayload<State>) { }
}

export type Actions
  = NavigationAction
  | CancelAction
  | ErrorAction;
