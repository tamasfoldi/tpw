import { LessonListService } from 'app/services/lesson-list/lesson-list.service';
import { LessonService } from './services/lesson/lesson.service';
import { StatisticsService } from './services/statistics/statistics.service';
import { LessonGuard } from './guards/lesson.guard';
import { MyDomRenderer } from './services/renderer/my-dom-renderer';
import { LESSON_BASE_URL, STATISTIC_BASE_URL, LESSONLIST_BASE_URL } from './services/tokens';
import { environment } from '../environments/environment';
import { Provider } from '@angular/core';
import { MyMockConnectionBackend } from './mock-http/my-mock-connection-backend';

export const _LESSONLIST_BASE_URL = environment.apiBaseUrl + '/' + environment.lessonListApiUrl;
export const _LESSON_BASE_URL = environment.apiBaseUrl + '/' + environment.lessonApiUrl;
export const _STATISTIC_BASE_URL = environment.apiBaseUrl + '/' + environment.statisticApiUrl;
export const APP_PROVIDERS: Provider[] = [
  LessonListService,
  LessonService,
  StatisticsService,
  LessonGuard,
  MyDomRenderer,

  { provide: LESSONLIST_BASE_URL, useValue: _LESSONLIST_BASE_URL },
  { provide: LESSON_BASE_URL, useValue: _LESSON_BASE_URL },
  { provide: STATISTIC_BASE_URL, useValue: _STATISTIC_BASE_URL }
];

