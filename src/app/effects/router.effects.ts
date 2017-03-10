// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as routerActions from '../actions/router.actions';
import * as lessons from '../actions/lessons.actions';
import * as lesson from '../actions/lesson.actions';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private route: ActivatedRoute, private router: Router) { }

  @Effect()
  loadSelected$: Observable<Action> = this.actions$
    .ofType(routerActions.ActionTypes.NAVIGATION)
    .map(action => action.payload.routerState.root.firstChild.firstChild.params)
    .select(params => params['id'])
    .filter(id => !!id)
    .map(id => new lessons.SelectAction(id));
}
