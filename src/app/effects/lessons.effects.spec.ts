import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { LessonsEffects } from './lessons.effects';
import { LessonService } from '../services/lesson/lesson.service';
import { Observable } from 'rxjs/Observable';
import * as lessons from '../actions/lessons.actions';
import { Lesson } from '../../common/lesson';
import { LessonListElement } from '../../common/lesson-list-element';
import { Http, ConnectionBackend, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { MockHttp } from '../mock-http/mock-http';
import { LESSONLIST_BASE_URL } from '../services/tokens';
import { LessonListService } from '../services/lesson-list/lesson-list.service';

describe('LessonEffects', () => {
  let runner: EffectsRunner;
  let lessonsEffects;
  let serviceSpy: jasmine.Spy;
  let result;
  let expectedResult;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      LessonsEffects,
      LessonListService,

      { provide: LESSONLIST_BASE_URL, useValue: 'test' },
      MockBackend,
      BaseRequestOptions,
      {
        provide: Http, useFactory: (backend: ConnectionBackend,
          defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);

        }, deps: [MockBackend, BaseRequestOptions]
      }
    ]
  }));



  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    lessonsEffects = TestBed.get(LessonsEffects);
    result = null;
  });

  describe('loadList$', () => {
    beforeEach(inject([LessonListService], (lessonListService: LessonListService) => {
      serviceSpy = spyOn(lessonListService, 'getLessonList');
    }));

    afterEach(inject([LessonListService], (lessonListService: LessonListService) => {
      expect(lessonListService.getLessonList).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    }));

    it('should return a new LoadListSuccessAction, with the lessons, on success', fakeAsync(
      inject([LessonListService], (lessonListService: LessonListService) => {
        serviceSpy.and.returnValue(Observable.of([{ id: 'test_1', title: 'Test 1', isAvailable: true }]));

        expectedResult = new lessons.LoadListSuccessAction([{ id: 'test_1', title: 'Test 1', isAvailable: true }]);

        lessonsEffects.loadList$
          .subscribe(_result => result = _result);
      })));

    it('should return a new LoadListFailAction, with the fail', fakeAsync(
      inject([LessonListService], (lessonListService: LessonListService) => {
        serviceSpy.and.returnValue(Observable.throw('fail'));

        expectedResult = new lessons.LoadListFailAction('fail');

        lessonsEffects.loadList$
          .subscribe(_result => result = _result);
      })));
  });

  describe('setAvail$', () => {
    beforeEach(inject([LessonListService], (lessonListService: LessonListService) => {
      serviceSpy = spyOn(lessonListService, 'setAvailable');
      runner.queue(new lessons.SetAvailAction('test_1'));
    }));

    afterEach(inject([LessonListService], (lessonListService: LessonListService) => {
      expect(lessonListService.setAvailable).toHaveBeenCalledTimes(1);
      expect(lessonListService.setAvailable).toHaveBeenCalledWith('test_1');
      expect(result).toEqual(expectedResult);
    }));

    it('should return a new SetAvailSuccessAction with the id',
      inject([LessonListService], (lessonListService: LessonListService) => {
        serviceSpy.and.returnValue(Observable.of(''));

        expectedResult = new lessons.SetAvailSuccessAction('test_1');

        lessonsEffects.setAvail$
          .subscribe(_result => result = _result);
      }));

    it('should return a new SetAvailFailAction, with the fail',
      inject([LessonListService], (lessonListService: LessonListService) => {
        serviceSpy.and.returnValue(Observable.throw('fail'));

        expectedResult = new lessons.SetAvailFailAction('fail');

        lessonsEffects.setAvail$
          .subscribe(_result => result = _result);
      }));
  });

});
