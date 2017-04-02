import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, ConnectionBackend, Http, ResponseOptions, RequestMethod, Response } from '@angular/http';
import { of } from 'rxjs/observable/of';
import { StatisticsService } from './statistics.service';

import { STATISTIC_BASE_URL } from '../../services/tokens';
import * as mockData from '../../mock-http/mock-http-data';

describe('StatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: STATISTIC_BASE_URL, useValue: 'test' },
        MockBackend,
        BaseRequestOptions,
        StatisticsService,
        {
          provide: Http, useFactory: (backend: ConnectionBackend,
            defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);

          }, deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  describe('newLessonStatistic', () => {
    it('should post new statistic',
      inject([StatisticsService, MockBackend], fakeAsync((statisticService: StatisticsService, mockBackend: MockBackend) => {
        let res = null;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('test');
          expect(c.request.method).toBe(RequestMethod.Post);
          const response = new ResponseOptions();
          c.mockRespond(new Response(response));
        });
        statisticService.newLessonStatistic(mockData.STATISTIC).subscribe((_res) => {
          res = _res;
        });
        tick();

        expect(res).toBeNull();
      }))
    );
  });
});
