// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LessonService } from '../services/lesson/lesson.service';
import * as lessons from '../actions/lessons.actions';

@Injectable()
export class LessonsEffects {
  constructor(private actions$: Actions, private lessonService: LessonService) { }


  @Effect()
  loadList$: Observable<Action> = this.actions$
    .ofType(lessons.ActionTypes.LOAD_LIST)
    .switchMap(() => this.lessonService.getLessonList()
      .map(ls => new lessons.LoadListSuccessAction(ls))
      .catch(() => Observable.of(new lessons.LoadListFailAction('fail'))));
}
