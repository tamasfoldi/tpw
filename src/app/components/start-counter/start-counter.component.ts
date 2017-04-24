import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/index';
import * as fromRoot from '../../reducers/index';
import * as lesson from '../../actions/lesson.actions';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'tpw-start-counter',
  templateUrl: './start-counter.component.html',
  styleUrls: ['./start-counter.component.scss']
})
export class StartCounterComponent implements OnInit {
  readonly secsBeforeStart = 3;
  counted = 0;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.select(fromRoot.isAllPlayerReady)
      .filter(r => r)
      .take(1)
      .subscribe(() => this.startCounting());
  }

  startCounting() {
    this.counted = 0;
    Observable.interval(1000)
      .timeInterval()
      .take(this.secsBeforeStart)
      .subscribe(i => {
        this.counted = i.value + 1;
        this.store.dispatch(new lesson.CountAction(this.secsBeforeStart - this.counted));
      },
      () => { },
      () => this.store.dispatch(new lesson.StartAction()));
  }

}
