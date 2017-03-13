import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { LessonService } from './lesson.service';
import { MockBackend } from '@angular/http/testing';
import { ResponseOptions, BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';
import { LESSON_BASE_URL } from '../tokens';
import { MockHttp } from '../../mock-http/mock-http';
import * as mockData from '../../mock-http/mock-http-data';

describe('LessonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LESSON_BASE_URL, useValue: 'test' },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http, useFactory: (backend: ConnectionBackend,
            defaultOptions: BaseRequestOptions, baseUrl: string) => {
            return new MockHttp(backend, defaultOptions, baseUrl);

          }, deps: [MockBackend, BaseRequestOptions, LESSON_BASE_URL]
        },
        LessonService
      ]
    });
  });

  describe('getLessonList', () => {
    it('retrieves the LessonList',
      inject([LessonService, MockBackend], fakeAsync((lessonService: LessonService, mockBackend: MockBackend) => {
        let res;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('test/lessons');
          const response = new ResponseOptions();
          c.mockRespond(new Response(response));

        });
        lessonService.getLessonList().subscribe((_res) => {
          res = _res;
        });

        tick();
        expect(res).toBe(mockData.LESSON_LIST);
      }))
    );
  });

  describe('getLesson', () => {
    it('retrieves lesson using lesson id',
      inject([LessonService, MockBackend], fakeAsync((lessonService: LessonService, mockBackend: MockBackend) => {
        let res;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('test/lesson/1');
          const response = new ResponseOptions();
          c.mockRespond(new Response(response));

        });
        lessonService.getLesson('1').subscribe((_res) => {
          res = _res;
        });

        tick();
        expect(res).toBe(mockData.LESSONS[0]);
      }))
    );
  });
});
