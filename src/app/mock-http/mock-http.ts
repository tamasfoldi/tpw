import { LESSON_BASE_URL } from '../services/tokens';
import { Http, ConnectionBackend, BaseRequestOptions, RequestOptionsArgs, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Rx';
import { Inject } from '@angular/core';
import * as mockData from './mock-http-data';

export class MockHttp extends Http {
  constructor(
    private backend: ConnectionBackend,
    private defaultOptions: BaseRequestOptions, @Inject(LESSON_BASE_URL)
    private baseUrl: string) {
    super(backend, defaultOptions);
  }
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    if (url.includes(`${this.baseUrl}/lesson/`)) {
      const id = url.split('/').reverse()[0];
      const data = mockData.LESSONS
        .find(lesson => lesson.id === id);
      return Observable.of(new Response(new ResponseOptions({ body: data })));
    } else if (url.includes(`${this.baseUrl}/lessons`)) {
      return Observable.of(new Response(new ResponseOptions({ body: mockData.LESSON_LIST })));
    }
  }
}
