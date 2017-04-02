// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

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
}
