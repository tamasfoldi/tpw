import { Http, ConnectionBackend, BaseRequestOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LessonService } from './services/lesson/lesson.service';
import { LessonGuard } from './guards/lesson.guard';
import { MyDomRenderer } from './services/renderer/my-dom-renderer';
import { LESSON_BASE_URL } from './services/tokens';
import { MockHttp } from './mock-http/mock-http';
import { environment } from '../environments/environment';

export const BASE_URL = `${environment.baseUrl}`;
export const APP_PROVIDERS = [
  LessonService,
  LessonGuard,
  MyDomRenderer,

  ConnectionBackend,
  BaseRequestOptions,

  { provide: LESSON_BASE_URL, useValue: BASE_URL },
  {
    provide: Http, useFactory: (backend: ConnectionBackend,
      defaultOptions: BaseRequestOptions) => {
      return new MockHttp(backend, defaultOptions);

    }, deps: [ConnectionBackend, BaseRequestOptions, LESSON_BASE_URL]
  }
];

