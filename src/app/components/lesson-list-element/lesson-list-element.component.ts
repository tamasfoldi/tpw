import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LessonListElement } from '../../../common/lesson-list-element';

@Component({
  selector: 'tpw-lesson-list-element',
  templateUrl: './lesson-list-element.component.html',
  styleUrls: ['./lesson-list-element.component.scss']
})
export class LessonListElementComponent {
  @Input('lesson')
  lesson: LessonListElement;

  @Output('onSelect')
  onSelect = new EventEmitter<string>();
  constructor() { }
}
