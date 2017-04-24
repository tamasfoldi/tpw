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

  it('should display the title', () => {
    component.lesson = { id: '0', isAvailable: false, title: 'test' };
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('test');
  });

  it(`should add available class if lesson's isAvailable is true`, () => {
    component.lesson = { id: '0', isAvailable: false, title: 'test' };
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.available')).toBeNull();

    component.lesson = { id: '0', isAvailable: true, title: 'test' };
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('.available')).not.toBeNull();
  });

  it('should emit the id through onSelect', () => {
    spyOn(component.onSelect, 'emit');
    component.lesson = { id: '0', isAvailable: false, title: 'test' };
    fixture.detectChanges();

    fixture.debugElement.nativeElement.querySelector('div').click();

    expect(component.onSelect.emit).toHaveBeenCalled();
    expect(component.onSelect.emit).toHaveBeenCalledTimes(1);
    expect(component.onSelect.emit).toHaveBeenCalledWith('0');
  });
});
