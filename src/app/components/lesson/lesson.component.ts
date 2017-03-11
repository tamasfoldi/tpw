import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterContentChecked } from '@angular/core';
import { Lesson } from '../../models/lessons/lesson';

@Component({
  selector: 'tpw-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit, AfterContentChecked {

  @Input('lesson')
  lesson: Lesson;

  @Input('typedText')
  typedText: string;

  @Input('disableInput')
  disableInput: boolean;

  @Output('onKeyup')
  onKeyup = new EventEmitter<KeyboardEvent>();

  @ViewChild('lessonInput')
  lessonInput: ElementRef;

  constructor() { }

  ngOnInit() { }

  ngAfterContentChecked() {
    this.lessonInput.nativeElement.focus();
  }

  handleKeyup(event: KeyboardEvent) {
    event.preventDefault();
    this.onKeyup.emit(event);
  }

}
