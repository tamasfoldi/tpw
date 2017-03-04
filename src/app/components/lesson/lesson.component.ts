import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lesson } from '../../models/lessons/lesson';

@Component({
  selector: 'tpw-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  @Input('lesson')
  lesson: Lesson;

  @Input('typedText')
  typedText: string;

  @Output('onKeyup')
  onKeyup = new EventEmitter<KeyboardEvent>();

  constructor() { }

  ngOnInit() { }

  handleKeyup(event: KeyboardEvent) {
    event.preventDefault();
    this.onKeyup.emit(event);
  }

}
