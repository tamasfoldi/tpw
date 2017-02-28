import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { LessonEffects } from './lesson.effets';
import { LessonService } from '../services/lesson/lesson.service';
import { Observable } from 'rxjs/Observable';
import * as lesson from '../actions/lesson.actions';
import { Lesson } from '../models/lessons/lesson';
import { LessonListElement } from '../models/lessons/lesson-list-element';

describe('LessonEffects', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      LessonEffects,
      LessonService
    ]
  }));

  describe('loadList$', () => {
    function setup(params?: { lessonListParam: Observable<LessonListElement[]> }) {
      const lessonService = TestBed.get(LessonService);
      if (params) {
        lessonService.getLessonList.and.returnValue(params.lessonListParam);
      }
      return {
        runner: TestBed.get(EffectsRunner),
        lessonEffects: TestBed.get(LessonEffects)
      };
    }
    it('should return a new LoadListSuccessAction, with the lessons, on success, after the de-bounce', fakeAsync(
      inject([LessonService], (lessonService: LessonService) => {
        spyOn(lessonService, 'getLessonList');
        const { runner, lessonEffects } = setup({ lessonListParam: Observable.of([{ id: 'test_1', title: 'Test 1', isCompleted: true }]) });

        const expectedResult = new lesson.LoadListSuccessAction([{ id: 'test_1', title: 'Test 1', isCompleted: true }]);
        runner.queue(new lesson.LoadListAction());

        let result = null;
        lessonEffects.loadList$
          .subscribe(_result => result = _result);
        tick(299); // test de-bounce
        expect(result).toBe(null);
        tick(1);
        expect(lessonService.getLessonList).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResult);
      })));

  });

  describe('loadSelected$', () => {
    function setup(params?: { lessonParam: Observable<Lesson> }) {
      const lessonService = TestBed.get(LessonService);
      if (params) {
        lessonService.getLesson.and.returnValue(params.lessonParam);
      }
      return {
        runner: TestBed.get(EffectsRunner),
        lessonEffects: TestBed.get(LessonEffects)
      };
    }
    it('should return a new LoadSuccessAction, with the lesson, on success, after the de-bounce', fakeAsync(
      inject([LessonService], (lessonService: LessonService) => {
        spyOn(lessonService, 'getLesson');
        const { runner, lessonEffects } = setup({ lessonParam: Observable.of({ id: 'test_1', title: 'Test 1', text: 'Test 1' }) });

        const expectedResult = new lesson.LoadSuccessAction({ id: 'test_1', title: 'Test 1', text: 'Test 1' });
        runner.queue(new lesson.LoadAction('test_1'));

        let result = null;
        lessonEffects.loadSelected$
          .subscribe(_result => result = _result);
        tick(299); // test de-bounce
        expect(result).toBe(null);
        tick(1);
        expect(lessonService.getLesson).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResult);
      })));

  });
});
