import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { LessonService } from './lesson.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ResponseOptions, BaseRequestOptions, ConnectionBackend, Http, Connection, RequestMethod, Response } from '@angular/http';
import { LESSON_BASE_URL } from '../tokens';
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
            defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);

          }, deps: [MockBackend, BaseRequestOptions]
        },
        LessonService
      ]
    });
  });


  describe('getLesson', () => {
    it('retrieves lesson using lesson id',
      inject([LessonService, MockBackend], fakeAsync((lessonService: LessonService, mockBackend: MockBackend) => {
        let res;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('test/1');
          expect(c.request.method).toBe(RequestMethod.Get);
          const response = new ResponseOptions({ body: JSON.stringify(mockData.LESSONS[0]) });
          c.mockRespond(new Response(response));
        });
        lessonService.getLesson('1').subscribe((_res) => {
          res = _res;
        });

        tick();

        expect(res).toEqual(mockData.LESSONS[0]);
      }))
    );
  });
});
