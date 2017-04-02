import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { ConnectionBackend, BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { LessonListService } from './lesson-list.service';
import { MockHttp } from '../../mock-http/mock-http';
import { LESSONLIST_BASE_URL } from '../tokens';
import * as mockData from '../../mock-http/mock-http-data';

describe('LessonListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LESSONLIST_BASE_URL, useValue: 'test' },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend,
            defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        LessonListService
      ]
    });
  });

  it('should ...', inject([LessonListService], (service: LessonListService) => {
    expect(service).toBeTruthy();
  }));


  describe('getLessonList', () => {
    it('retrieves the LessonList',
      inject([LessonListService, MockBackend], fakeAsync((lessonListService: LessonListService, mockBackend: MockBackend) => {
        let res;
        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('test');
          expect(c.request.method).toBe(RequestMethod.Get);
          const response = new ResponseOptions({ body: JSON.stringify(mockData.LESSON_LIST) });
          c.mockRespond(new Response(response));

        });
        lessonListService.getLessonList().subscribe((_res) => {
          res = _res;
        });

        tick();
        expect(res).toEqual(mockData.LESSON_LIST);
      }))
    );
  });
});
