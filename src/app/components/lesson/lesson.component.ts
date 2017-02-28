import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from '../../models/lessons/lesson';

@Component({
  selector: 'tpw-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  @Input('lesson')
  lesson: Lesson;
  constructor() { }

  ngOnInit() {
  }

}
