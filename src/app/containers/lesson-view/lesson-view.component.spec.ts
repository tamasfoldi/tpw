import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import { LessonViewComponent } from './lesson-view.component';
import { LessonComponent } from '../../components/lesson/lesson.component';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { LessonStatisticComponent } from '../../components/lesson-statistic/lesson-statistic.component';
import { ComputerEnemy } from '../../computer-enemy/computer-enemy';
import { MyDomRenderer } from '../../services/renderer/my-dom-renderer';
import * as player from '../../actions/player.actions';

describe('LessonViewComponent', () => {
  let component: LessonViewComponent;
  let fixture: ComponentFixture<LessonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LessonViewComponent,
        LessonComponent,
        ProgressBarComponent,
        LessonStatisticComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: Store,
          useClass: class {
            select = jasmine.createSpy('select').and.returnValue(of());
            dispatch = jasmine.createSpy('dispatch');
          }
        },
        {
          provide: ComputerEnemy,
          useClass: class {
            connectToRace = jasmine.createSpy('connectToRace');
          }
        },
        MyDomRenderer
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    let specFixture;
    let specComponent;

    beforeEach(() => {
      specFixture = TestBed.createComponent(LessonViewComponent);
      specComponent = specFixture.componentInstance;
    });

    it('should initialize datas from Store', () => {
      expect(specComponent.selectedLesson$).toBeUndefined();
      expect(specComponent.typedText$).toBeUndefined();
      expect(specComponent.isLessonEnded$).toBeUndefined();
      expect(specComponent.isLessonStarted$).toBeUndefined();
      expect(specComponent.isStarting$).toBeUndefined();
      expect(specComponent.statistic$).toBeUndefined();
      expect(specComponent.progress$).toBeUndefined();
      expect(specComponent.enemiesProgress$).toBeUndefined();

      specFixture.detectChanges();

      expect(specComponent.selectedLesson$).toBeDefined();
      expect(specComponent.typedText$).toBeDefined();
      expect(specComponent.isLessonEnded$).toBeDefined();
      expect(specComponent.isLessonStarted$).toBeDefined();
      expect(specComponent.isStarting$).toBeDefined();
      expect(specComponent.statistic$).toBeDefined();
      expect(specComponent.progress$).toBeDefined();
      expect(specComponent.enemiesProgress$).toBeDefined();
    });

    it('should connect enemy to race', inject([ComputerEnemy], (enemy: ComputerEnemy) => {
      expect(enemy.connectToRace).toHaveBeenCalled();
      expect(enemy.connectToRace).toHaveBeenCalledTimes(1);
    }));

    it('should connect player to race', inject([Store], (store: Store<any>) => {
      const expectedAction = new player.NewAction('player');

      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    }));
  });

  describe('handleKeyup', () => {
    it('should navigate dispatch a new KeyAction', inject([Store], (store: Store<any>) => {
      const expectedAction = new player.KeyAction(new KeyboardEvent('a'));
      component.handleKeyup(new KeyboardEvent('a'));

      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    }));

    it('should be called when lesson component onKeyup emits', () => {
      spyOn(component, 'handleKeyup');

      fixture.debugElement.query(By.directive(LessonComponent))
        .injector.get(LessonComponent)
        .onKeyup.emit(new KeyboardEvent('a'));

      expect(component.handleKeyup).toHaveBeenCalled();
      expect(component.handleKeyup).toHaveBeenCalledTimes(1);
      expect(component.handleKeyup).toHaveBeenCalledWith(new KeyboardEvent('a'));
    });
  });

  describe('handleReady', () => {
    it('should navigate dispatch a new ReadyAction', inject([Store], (store: Store<any>) => {
      const expectedAction = new player.ReadyAction('player');
      component.handleReady();

      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    }));

    it('should be called when button clicked', () => {
      spyOn(component, 'handleReady');

      fixture.debugElement.nativeElement.querySelector('button').click();

      expect(component.handleReady).toHaveBeenCalled();
      expect(component.handleReady).toHaveBeenCalledTimes(1);
    });
  });
});
