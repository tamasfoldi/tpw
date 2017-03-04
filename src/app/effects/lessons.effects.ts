// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { LessonService } from '../services/lesson/lesson.service';
import * as lesson from '../actions/lessons.actions';

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
}
