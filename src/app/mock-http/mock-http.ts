import { LESSON_BASE_URL } from '../services/tokens';
import {
  Http, ConnectionBackend, BaseRequestOptions,
  RequestOptionsArgs, Response, ResponseOptions, Request, RequestMethod
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Rx';
import { Inject, Injectable } from '@angular/core';
import * as mockData from './mock-http-data';
import { LessonListElement } from '../../common/lesson-list-element';
import { Lesson } from '../../common//lesson';
import * as _ from 'lodash';

@Injectable()
export class MockHttp extends Http {

  constructor(
    private backend: ConnectionBackend,
    private defaultOptions: BaseRequestOptions) {
    super(backend, defaultOptions);
  }
  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.backend.createConnection(new Request({ url: url, method: RequestMethod.Get }));
    return Observable.of(true)
      .map(() => {
        let rspData;
        if (url.includes(`/lesson/`)) {
          const id = url.split('/').reverse()[0];
          rspData = this.getLessonData(id);
        } else if (url.includes(`/lessons`)) {
          rspData = this.getLessons();
        }
        return new Response(new ResponseOptions({ body: rspData }));
      });
  }

  post(url: string, options?: RequestOptionsArgs): Observable<Response> {
    this.backend.createConnection(new Request({ url: url, method: RequestMethod.Post, body: options.body }));
    return Observable.of(true)
      .map(() => {
        return new Response(new ResponseOptions());
      });
  }

  getLessons(): LessonListElement[] {
    return mockData.LESSON_LIST;
  }

  getLessonData(lessonId: string): Lesson {
    return mockData.LESSONS
      .find(lesson => lesson.id === lessonId);
  }
}
