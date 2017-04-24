import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tpw-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  private _value;
  @Input('value')
  set value(value: string) {
    this._value = value;
  };

  get value(): string {
    return `${this._value}%`;
  }
  @Input('color')
  color = 'red';

  constructor() { }
}
