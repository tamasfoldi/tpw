import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonListViewComponent } from './lesson-list-view.component';

describe('LessonListViewComponent', () => {
  let component: LessonListViewComponent;
  let fixture: ComponentFixture<LessonListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LessonListViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
