import { Component, OnInit, Input } from '@angular/core';
import { Statistic } from '../../../common/statistic';

@Component({
  selector: 'tpw-lesson-statistic',
  templateUrl: './lesson-statistic.component.html',
  styleUrls: ['./lesson-statistic.component.scss']
})
export class LessonStatisticComponent implements OnInit {
  @Input('data')
  data: Statistic;
  constructor() { }
  ngOnInit() {
  }

}
