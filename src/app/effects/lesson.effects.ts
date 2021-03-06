// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { LessonService } from '../services/lesson/lesson.service';
import * as lessons from '../actions/lessons.actions';
import * as lesson from '../actions/lesson.actions';
import * as player from '../actions/player.actions';
import * as statistic from '../actions/statistic.actions';
import { State } from '../reducers/index';
import * as fromRoot from '../reducers/index';

@Injectable()
export class LessonEffects {
  constructor(private actions$: Actions, private lessonService: LessonService, private store: Store<State>) { }


  @Effect()
  selectLesson$: Observable<Action> = this.actions$
    .ofType(lessons.ActionTypes.SELECT)
    .map(action => action.payload)
    .mergeMap(id => [
      new lesson.ClearAction(),
      new lesson.LoadAction(id)
    ]);

  @Effect()
  loadLesson$: Observable<Action> = this.actions$
    .ofType(lesson.ActionTypes.LOAD)
    .map(action => action.payload)
    .switchMap(id => this.lessonService.getLesson(id)
      .map(l => new lesson.LoadSuccessAction(l))
      .catch(() => Observable.of(new lesson.LoadFailAction('error'))));

  @Effect()
  lessonComplete$: Observable<Action> = this.store.select(fromRoot.wasLessonCompleted)
    .filter(typed => typed)
    .switchMap(() => this.store.select(fromRoot.getCurrentLessonId)
      .take(1)
      .mergeMap(id => [
        new lesson.EndAction(),
        new lessons.SetAvailAction((parseInt(id, 10) + 1).toString())
      ])
    );

  @Effect()
  addStat$: Observable<Action> = this.store.select(fromRoot.isLessonEnded)
    .filter(typed => typed)
    .switchMap(() => this.store.select(fromRoot.getLessonStatistic)
      .take(1)
      .map(stat => new statistic.AddAction(stat))
    );

  @Effect()
  palyerProgress$: Observable<Action> = this.store.select(fromRoot.getLessonProgress)
    .filter(p => !!p)
    .map(p => new player.ProgressAction({ id: 'player', progress: p }));
}
