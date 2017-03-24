import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { LessonsEffects } from './lessons.effects';
import { LessonService } from '../services/lesson/lesson.service';
import { Observable } from 'rxjs/Observable';
import * as lesson from '../actions/lessons.actions';
import { Lesson } from '../models/lessons/lesson';
import { LessonListElement } from '../models/lessons/lesson-list-element';
import { Http, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MockHttp } from '../mock-http/mock-http';
import { LESSON_BASE_URL } from '../services/tokens';

describe('LessonEffects', () => {
  let runner;
  let lessonsEffects;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      LessonsEffects,
      LessonService,

      { provide: LESSON_BASE_URL, useValue: 'test' },
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
    lessonsEffects = TestBed.get(LessonsEffects);
  });

  describe('loadList$', () => {
    it('should return a new LoadListSuccessAction, with the lessons, on success', fakeAsync(
      inject([LessonService], (lessonService: LessonService) => {
        spyOn(lessonService, 'getLessonList').and.returnValue(Observable.of([{ id: 'test_1', title: 'Test 1', isAvailable: true }]));

        const expectedResult = new lesson.LoadListSuccessAction([{ id: 'test_1', title: 'Test 1', isAvailable: true }]);

        let result = null;
        lessonsEffects.loadList$
          .subscribe(_result => result = _result);
        expect(lessonService.getLessonList).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResult);
      })));

    it('should return a new LoadListFailAction, with the fail', fakeAsync(
      inject([LessonService], (lessonService: LessonService) => {
        spyOn(lessonService, 'getLessonList').and.returnValue(Observable.throw('fail'));

        const expectedResult = new lesson.LoadListFailAction('fail');

        let result = null;
        lessonsEffects.loadList$
          .subscribe(_result => result = _result);
        expect(lessonService.getLessonList).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResult);
      })));
  });

});
