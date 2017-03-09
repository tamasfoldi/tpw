import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonStatisticComponent } from './lesson-statistic.component';

describe('LessonStatisticComponent', () => {
  let component: LessonStatisticComponent;
  let fixture: ComponentFixture<LessonStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LessonStatisticComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
