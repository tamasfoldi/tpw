import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LessonListElement } from '../../../common/lesson-list-element';

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
}
