import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import { StartCounterComponent } from './start-counter.component';
import * as lesson from '../../actions/lesson.actions';

describe('StartCounterComponent', () => {
  let component: StartCounterComponent;
  let fixture: ComponentFixture<StartCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartCounterComponent],
      providers: [
        {
          provide: Store,
          useClass: class {
            select = jasmine.createSpy('select').and.returnValue(of(true));
            dispatch = jasmine.createSpy('dispatch');
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('startCounting', () => {
    it('should call store dispatch 4 times and once with StartAction', fakeAsync(inject([Store], (store: Store<any>) => {
      component.startCounting();
      tick(3000);
      expect(store.dispatch).toHaveBeenCalledTimes(4);
      expect(store.dispatch).toHaveBeenCalledWith(new lesson.StartAction());
    })));
  });

});
