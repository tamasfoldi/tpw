import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { LessonEffects } from './lessons.effects';
import { LessonService } from '../services/lesson/lesson.service';
import { Observable } from 'rxjs/Observable';
import * as lesson from '../actions/lessons.actions';
import { Lesson } from '../models/lessons/lesson';
import { LessonListElement } from '../models/lessons/lesson-list-element';

describe('LessonEffects', () => {
  let runner;
  let lessonsEffects;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      LessonEffects,
      LessonService
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    lessonsEffects = TestBed.get(LessonEffects);
  });

  describe('loadList$', () => {
    it('should return a new LoadListSuccessAction, with the lessons, on success, after the de-bounce', fakeAsync(
      inject([LessonService], (lessonService: LessonService) => {
        spyOn(lessonService, 'getLessonList').and.returnValue(Observable.of([{ id: 'test_1', title: 'Test 1', isAvailable: true }]));

        const expectedResult = new lesson.LoadListSuccessAction([{ id: 'test_1', title: 'Test 1', isAvailable: true }]);
        runner.queue(new lesson.LoadListAction());

        let result = null;
        lessonsEffects.loadList$
          .subscribe(_result => result = _result);
        expect(lessonService.getLessonList).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResult);
      })));

  });

});
