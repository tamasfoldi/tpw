import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, fakeAsync, tick, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterEffects } from './router.effects';
import { LessonService } from '../services/lesson/lesson.service';
import { Observable } from 'rxjs/Observable';
import * as lesson from '../actions/lesson.actions';
import { Lesson } from '../models/lessons/lesson';
import { LessonListElement } from '../models/lessons/lesson-list-element';

describe('RouterEffects', () => {
  let runner;
  let routerEffects;
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
});
