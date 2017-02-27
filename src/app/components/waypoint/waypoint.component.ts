import { Component, OnInit, Input } from '@angular/core';
import { LessonListElement } from "../../models/lessons/lesson-list-element";

@Component({
  selector: 'tpw-waypoint',
  templateUrl: './waypoint.component.html',
  styleUrls: ['./waypoint.component.scss']
})
export class WaypointComponent implements OnInit {
  @Input('lesson')
  lesson: LessonListElement;
  constructor() { }

  ngOnInit() {
  }

}
