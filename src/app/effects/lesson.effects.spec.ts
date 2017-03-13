import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { LessonEffects } from './lesson.effects';
import { LessonService } from '../services/lesson/lesson.service';
import { Observable } from 'rxjs/Observable';
import * as lesson from '../actions/lesson.actions';
import * as player from '../actions/player.actions';
import * as lessons from '../actions/lessons.actions';
import { Lesson } from '../models/lessons/lesson';
import { LessonListElement } from '../models/lessons/lesson-list-element';
import { StoreModule, Store } from '@ngrx/store';
import { reducer, State } from '../reducers/index';
import * as fromRoot from '../reducers/index';

describe('LessonEffects', () => {
  let runner: EffectsRunner;
  let lessonEffects: LessonEffects;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      StoreModule.provideStore(reducer)
    ],
    providers: [
      LessonEffects,
      LessonService
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    lessonEffects = TestBed.get(LessonEffects);
  });

  describe('selectLesson$', () => {
    it('should return a new ClearAction and a new LoadAction with the lesson id', fakeAsync(
      inject([LessonService], (lessonService: LessonService) => {
        const expectedResult1 = new lesson.ClearAction();
        const expectedResult2 = new lesson.LoadAction('test_1');
        runner.queue(new lessons.SelectAction('test_1'));

        let result1 = null;
        let result2 = null;
        lessonEffects.selectLesson$
          .take(1)
          .subscribe(_result => result1 = _result);
        lessonEffects.selectLesson$
          .skip(1)
          .subscribe(_result => result2 = _result);

        expect(result1).toEqual(expectedResult1);
        expect(result2).toEqual(expectedResult2);
      })));
  });

  describe('loadLesson$', () => {
    it('should return a new LoadSuccessAction, with the lesson', fakeAsync(
      inject([LessonService], (lessonService: LessonService) => {
        spyOn(lessonService, 'getLesson').and.returnValue(Observable.of({ id: 'test_1', text: 'test', title: 'Test', difficulty: 100 }));

        const expectedResult = new lesson.LoadSuccessAction({ id: 'test_1', text: 'test', title: 'Test', difficulty: 100 });
        runner.queue(new lesson.LoadAction('test_1'));
        let result = null;
        lessonEffects.loadLesson$
          .subscribe(_result => result = _result);

        expect(lessonService.getLesson).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResult);
      })));

    it('should return a new LoadFailAction, with the fail', fakeAsync(
      inject([LessonService], (lessonService: LessonService) => {
        spyOn(lessonService, 'getLesson').and.returnValue(Observable.throw('fail'));

        const expectedResult = new lesson.LoadFailAction('error');
        runner.queue(new lesson.LoadAction('test_1'));

        let result = null;
        lessonEffects.loadLesson$
          .subscribe(_result => result = _result);

        expect(lessonService.getLesson).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResult);
      })));
  });

  describe('lessonComplete$', () => {
    it('should return a new EndAction and a CompleteAction, with the lessonId',
      inject([LessonService, Store], (lessonService: LessonService, store: Store<State>) => {
        store.dispatch(new lesson.LoadSuccessAction({
          id: 'test_1',
          text: 't',
          title: 'Test',
          difficulty: 100
        }));
        store.dispatch(new player.KeyAction(new KeyboardEvent('t', { code: 'KeyT', key: 't' })));
        const expectedResult1 = new lesson.CompleteAction('test_1');
        const expectedResult2 = new lesson.EndAction();

        let result1, result2 = null;
        lessonEffects.lessonComplete$
          .subscribe(_result => {
            result1 = _result;
          });
        lessonEffects.lessonComplete$
          .take(1)
          .subscribe(_result => {
            result2 = _result;
          });

        expect(result1).toEqual(expectedResult1);
        expect(result2).toEqual(expectedResult2);
      }));
  });

  describe('palyerProgress$', () => {
    it('should return a new ProgressAction',
      inject([LessonService, Store], (lessonService: LessonService, store: Store<State>) => {
        store.dispatch(new lesson.LoadSuccessAction({
          id: 'test_1',
          text: 't',
          title: 'Test',
          difficulty: 100
        }));
        store.dispatch(new player.KeyAction(new KeyboardEvent('t', { code: 'KeyT', key: 't' })));
        const expectedResult = new player.ProgressAction({ id: 'player', progress: 100 });
        let result = null;
        lessonEffects.palyerProgress$
          .subscribe(_result => {
            result = _result;
          });

        expect(result).toEqual(expectedResult);
      }));
  });

});
