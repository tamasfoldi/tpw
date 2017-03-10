import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tpw-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input('value')
  value = 0;

  get _value() {
    return `${this.value}%`;
  }

  @Input('color')
  color = 'red';

  constructor() { }

  ngOnInit() {
  }

}
