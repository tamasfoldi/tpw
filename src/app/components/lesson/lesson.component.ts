import {
  Component, OnInit, Input, Output, EventEmitter, ElementRef,
  ViewChild, AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Lesson } from '../../../common/lesson';
import { MyDomRenderer } from '../../services/renderer/my-dom-renderer';

@Component({
  selector: 'tpw-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessonComponent implements AfterContentChecked {

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

  constructor(private renderer: MyDomRenderer) { }

  ngAfterContentChecked() {
    this.renderer.invokeElementMethod(this.lessonInput.nativeElement, 'focus', []);
  }

  handleKeyup(event: KeyboardEvent) {
    event.preventDefault();
    this.onKeyup.emit(event);
  }

}
