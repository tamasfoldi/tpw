// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { LessonListService } from '../services/lesson-list/lesson-list.service';
import * as lessons from '../actions/lessons.actions';

@Injectable()
export class LessonsEffects {
  constructor(private actions$: Actions, private lessonListService: LessonListService) { }

  @Effect()
  loadList$: Observable<Action> = this.actions$
    .ofType(lessons.ActionTypes.LOAD_LIST)
    .startWith(new lessons.LoadListAction())
    .switchMap(() => this.lessonListService.getLessonList()
      .map(ls => new lessons.LoadListSuccessAction(ls))
      .catch(() => Observable.of(new lessons.LoadListFailAction('fail'))));

  @Effect()
  setAvail$: Observable<Action> = this.actions$
    .ofType(lessons.ActionTypes.SET_AVAIL)
    .map(toPayload)
    .switchMap(id => this.lessonListService.setAvailable(id)
      .map(ls => new lessons.SetAvailSuccessAction(id))
      .catch(() => Observable.of(new lessons.SetAvailFailAction('fail'))));
}
