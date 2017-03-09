import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LessonListElement } from '../../models/lessons/lesson-list-element';

@Component({
  selector: 'tpw-waypoint',
  templateUrl: './waypoint.component.html',
  styleUrls: ['./waypoint.component.scss']
})
export class WaypointComponent implements OnInit {
  @Input('lesson')
  lesson: LessonListElement;

  @Output('onSelect')
  onSelect = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  handleClick() {
    if (this.lesson.isAvailable) {
      this.onSelect.emit(this.lesson.id);
    }
  }

}
