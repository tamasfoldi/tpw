import { Http, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LessonService } from './services/lesson/lesson.service';
import { LessonGuard } from './guards/lesson.guard';
import { MyDomRenderer } from './services/renderer/my-dom-renderer';
import { LESSON_BASE_URL } from './services/tokens';
import { MockHttp } from './mock-http/mock-http';
import { environment } from '../environments/environment';

export const APP_PROVIDERS = [
  LessonService,
  LessonGuard,
  MyDomRenderer,

  MockBackend,
  BaseRequestOptions,

  { provide: LESSON_BASE_URL, useValue: environment.baseUrl },
  {
    provide: Http, useFactory: (backend: ConnectionBackend,
      defaultOptions: BaseRequestOptions, baseUrl: string) => {
      return new MockHttp(backend, defaultOptions, baseUrl);

    }, deps: [MockBackend, BaseRequestOptions, LESSON_BASE_URL]
  }
];

