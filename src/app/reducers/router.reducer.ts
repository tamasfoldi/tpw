import { RouterStateSnapshot } from '@angular/router';
import * as router from '../actions/router.actions';

export function reducer(state = '', action: router.Actions) {
  if (action.type === router.ActionTypes.NAVIGATION) {
    const s: RouterStateSnapshot = action.payload.routerState;
    return s.url.toString();
  } else {
    return state;
  }
}
