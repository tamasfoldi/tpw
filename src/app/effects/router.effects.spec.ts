import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterEffects } from './router.effects';
import { LessonService } from '../services/lesson/lesson.service';
import { Observable } from 'rxjs/Observable';
import * as lessons from '../actions/lessons.actions';
import * as routerA from '../actions/router.actions';
import { Lesson } from '../models/lessons/lesson';
import { LessonListElement } from '../models/lessons/lesson-list-element';

describe('RouterEffects', () => {
  let runner: EffectsRunner;
  let routerEffects: RouterEffects;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule,
      RouterTestingModule
    ],
    providers: [
      RouterEffects
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    routerEffects = TestBed.get(RouterEffects);
  });

  // describe('loadSelected$', () => {
  //   it('should dispatch a new SelectAction with id', inject([ActivatedRoute], (route: ActivatedRoute) => {
  //     const expectedResult = new lessons.SelectAction('test1');
  //     runner.queue(new routerA.NavigationAction({
  //       routerState: {
  //         root: {
  //           firstChild: {
  //             firstChild: {
  //               params: {
  //                 id: 'test1'
  //               }
  //             }
  //           }
  //         }
  //       }
  //     } as any));

  //     let result = null;
  //     routerEffects.loadSelected$
  //       .subscribe(_result => result = _result);

  //     expect(result).toEqual(expectedResult);
  //   }));
  // });
});
