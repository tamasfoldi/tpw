import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonViewComponent } from './lesson-view.component';

describe('LessonViewComponent', () => {
  let component: LessonViewComponent;
  let fixture: ComponentFixture<LessonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LessonViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});