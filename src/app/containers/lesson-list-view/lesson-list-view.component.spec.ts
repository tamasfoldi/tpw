import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import { LessonListViewComponent } from './lesson-list-view.component';
import { LessonListElementComponent } from '../../components/lesson-list-element/lesson-list-element.component';
import * as fromRoot from '../../reducers';

describe('LessonListViewComponent', () => {
  let component: LessonListViewComponent;
  let fixture: ComponentFixture<LessonListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LessonListViewComponent,
        LessonListElementComponent
      ],
      providers: [
        {
          provide: Store,
          useClass: class {
            select = jasmine.createSpy('select').and.returnValue(of());
          }
        }
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should initialize datas from Store', inject([Store], (store: Store<any>) => {
      store.select = jasmine.createSpy('select').and.returnValue(of());
      const specFixture = TestBed.createComponent(LessonListViewComponent);
      const specComponent = specFixture.componentInstance;
      expect(specComponent.lessons$).toBeUndefined();
      expect(specComponent.isLoading$).toBeUndefined();

      specFixture.detectChanges();

      expect(specComponent.lessons$).toBeDefined();
      expect(specComponent.isLoading$).toBeDefined();
      expect(store.select).toHaveBeenCalledTimes(2);
    }));
  });

  describe('handleLessonSelect', () => {
    it('should navigate to /lesson/:id', inject([Router], (router: Router) => {
      spyOn(router, 'navigate');

      component.handleLessonSelect('1');

      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith(['/lesson', '1']);
    }));

    it('should be called when list element onSelect emits', () => {
      component.lessons$ = of([{ id: '1', title: 'test', isAvailable: true }, { id: '2', title: 'test', isAvailable: true }]);
      component.isLoading$ = of(false);
      fixture.detectChanges();
      spyOn(component, 'handleLessonSelect');

      fixture.debugElement.query(By.directive(LessonListElementComponent))
        .injector.get(LessonListElementComponent)
        .onSelect.emit('1');

      expect(component.handleLessonSelect).toHaveBeenCalled();
      expect(component.handleLessonSelect).toHaveBeenCalledTimes(1);
      expect(component.handleLessonSelect).toHaveBeenCalledWith('1');
    });
  });

  it('should display as many list element es lessons$.length', () => {
    component.lessons$ = of([{ id: '1', title: 'test', isAvailable: true }, { id: '2', title: 'test', isAvailable: true }]);
    component.isLoading$ = of(false);
    fixture.detectChanges();

    const displayedListElements = fixture.debugElement.nativeElement.querySelectorAll('tpw-lesson-list-element');

    expect(displayedListElements.length).toEqual(2);
  });

  it('should display isLoading, when isLoading$ is false', () => {
    component.isLoading$ = of(true);
    fixture.detectChanges();

    const componentInnerHTML = fixture.debugElement.nativeElement.innerHTML;

    expect(componentInnerHTML).toContain('Loading...');
  });
});
