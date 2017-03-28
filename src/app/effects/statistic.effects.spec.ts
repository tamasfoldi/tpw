import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { StatisticEffects } from './statistic.effects';
import { StatisticsService } from '../services/statistics/statistics.service';
import { Observable } from 'rxjs/Observable';
import * as statistic from '../actions/statistic.actions';
import { Http, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MockHttp } from '../mock-http/mock-http';
import * as mockData from '../mock-http/mock-http-data';
import { STATISTIC_BASE_URL } from '../services/tokens';

describe('StatisticEffects', () => {
  let runner;
  let statisticEffects;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      StatisticEffects,
      StatisticsService,

      { provide: STATISTIC_BASE_URL, useValue: 'test' },
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http, useFactory: (backend: ConnectionBackend,
          defaultOptions: BaseRequestOptions) => {
          return new MockHttp(backend, defaultOptions);

        }, deps: [MockBackend, BaseRequestOptions]
      }
    ]
  }));



  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    statisticEffects = TestBed.get(StatisticEffects);
  });

  describe('addLessonStat$', () => {
    it('should return a new AddSuccessAction, with the statistic, on success', fakeAsync(
      inject([StatisticsService], (statisticService: StatisticsService) => {
        spyOn(statisticService, 'newLessonStatistic').and
          .returnValue(Observable.of(mockData.STATISTIC));

        const expectedResult = new statistic.AddSuccessAction(mockData.STATISTIC);
        runner.queue(new statistic.AddAction(mockData.STATISTIC));
        let result = null;
        statisticEffects.addLessonStat$
          .subscribe(_result => result = _result);
        expect(statisticService.newLessonStatistic).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResult);
      })));

    it('should return a new AddFailAction, with the error, on error', fakeAsync(
      inject([StatisticsService], (statisticService: StatisticsService) => {
        spyOn(statisticService, 'newLessonStatistic').and
          .returnValue(Observable.throw('error'));

        const expectedResult = new statistic.AddFailAction('error');
        runner.queue(new statistic.AddAction(mockData.STATISTIC));
        let result = null;
        statisticEffects.addLessonStat$
          .subscribe(_result => result = _result);
        expect(statisticService.newLessonStatistic).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResult);
      })));
  });

});
