import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';

import { LessonGuard } from './lesson.guard';
import { reducer, State } from '../reducers/index';
import * as fromRoot from '../reducers/index';
import * as lessons from '../actions/lessons.actions';

describe('LessonGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore(reducer),
        RouterTestingModule
      ],
      providers: [LessonGuard]
    });
  });

  describe('canActivate', () => {
    beforeEach(inject([Store], (store: Store<State>) => {
      store.dispatch(new lessons.LoadListSuccessAction([{
        id: 'test1',
        title: 'Test1',
        isAvailable: true
      },
      {
        id: 'test2',
        title: 'test2',
        isAvailable: false
      }]));
    }));

    it('should not route if the lesson available',
      inject([Router, LessonGuard], (router: Router, guard: LessonGuard) => {
        spyOn(router, 'navigate');

        guard.canActivate({
          params: {
            id: 'test1'
          }
        } as any, undefined).subscribe(() => { })

        expect(router.navigate).not.toHaveBeenCalled();
      }));


    it('should not route / the lesson not available',
      inject([Router, LessonGuard], (router: Router, guard: LessonGuard) => {
        spyOn(router, 'navigate');

        guard.canActivate({
          params: {
            id: 'test2'
          }
        } as any, undefined).subscribe(() => { })

        expect(router.navigate).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      }));
  });

});
