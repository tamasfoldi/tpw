// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { StatisticsService } from '../services/statistics/statistics.service';
import * as statistic from '../actions/statistic.actions';

@Injectable()
export class StatisticEffects {
  constructor(private actions$: Actions, private statisticService: StatisticsService) { }


  @Effect()
  addLessonStat$: Observable<Action> = this.actions$
    .ofType(statistic.ActionTypes.ADD)
    .map(action => action.payload)
    .switchMap(stat => this.statisticService.newLessonStatistic(stat)
      .map(() => new statistic.AddSuccessAction(stat))
      .catch(() => Observable.of(new statistic.AddFailAction('error'))
      ));
}
