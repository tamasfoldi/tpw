import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonComponent } from './lesson.component';
import { MyDomRenderer } from '../../services/renderer/my-dom-renderer';

describe('LessonComponent', () => {
  let component: LessonComponent;
  let fixture: ComponentFixture<LessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LessonComponent],
      providers: [
        MyDomRenderer
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('handleKeyup', () => {
    it('should emit the pressed via onKeyup', () => {
      spyOn(component.onKeyup, 'emit');
      const keyboardEvent = new KeyboardEvent('t');
      component.handleKeyup(keyboardEvent);

      expect(component.onKeyup.emit).toHaveBeenCalled();
      expect(component.onKeyup.emit).toHaveBeenCalledTimes(1);
      expect(component.onKeyup.emit).toHaveBeenCalledWith(keyboardEvent);
    });
  });
});
