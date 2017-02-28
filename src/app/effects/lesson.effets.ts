// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LessonService } from '../services/lesson/lesson.service';
import * as lesson from '../actions/lesson.actions';

@Injectable()
export class LessonEffects {
  constructor(private actions$: Actions, private lessonService: LessonService) { }


  @Effect()
  loadList$: Observable<Action> = this.actions$
    .ofType(lesson.ActionTypes.LOAD_LIST)
    .debounceTime(300)
    .switchMap(() => this.lessonService.getLessonList()
      .map(lessons => new lesson.LoadListSuccessAction(lessons))
      .catch(() => Observable.of(new lesson.LoadListFailAction('fail')))
    );

  @Effect()
  loadSelected$: Observable<Action> = this.actions$
    .ofType(lesson.ActionTypes.LOAD)
    .debounceTime(300)
    .map(action => action.payload)
    .switchMap(id => this.lessonService.getLesson(id)
      .map(l => new lesson.LoadSuccessAction(l))
      .catch(() => Observable.of(new lesson.LoadListFailAction('fail')))
    );
}
