// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as router from '../actions/router.actions';
import * as lessons from '../actions/lessons.actions';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private route: ActivatedRoute) { }
}
