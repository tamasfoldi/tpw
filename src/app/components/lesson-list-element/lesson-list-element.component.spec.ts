import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonListElementComponent } from './lesson-list-element.component';

describe('WaypointComponent', () => {
  let component: LessonListElementComponent;
  let fixture: ComponentFixture<LessonListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LessonListElementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
