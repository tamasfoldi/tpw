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
      {
        provide: LessonService,
        useValue: jasmine.createSpyObj('lessonService', ['getLessonList'])
      }
    ]
  }));

  function setup(params?: { lessonListParam: Observable<LessonListElement[]> }) {
    const lessonService = TestBed.get(LessonService);
    if (params) {
      lessonService.getLessonList.and.returnValue(params.lessonListParam);
    }
    return {
      runner: TestBed.get(EffectsRunner),
      bookEffects: TestBed.get(LessonEffects)
    };
  }

  describe('loadList$', () => {
    it('should return a new lesson.LoadListSuccessAction, with the lessons, on success, after the de-bounce', fakeAsync(
      inject([LessonService], (lessonService: LessonService) => {
        const { runner, bookEffects } = setup({ lessonListParam: Observable.of([{ id: 'test_1', title: 'Test 1', isCompleted: true }]) });

        const expectedResult = new lesson.LoadListSuccessAction([{ id: 'test_1', title: 'Test 1', isCompleted: true }]);
        runner.queue(new lesson.LoadListAction());

        let result = null;
        bookEffects.loadList$
          .subscribe(_result => result = _result);
        tick(299); // test de-bounce
        expect(result).toBe(null);
        tick(300);
        expect(lessonService.getLessonList).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResult);
      })));

  });
});
