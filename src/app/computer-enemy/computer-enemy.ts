import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/Rx';
import { State } from '../reducers/index';
import * as fromRoot from '../reducers/index';
import * as lesson from '../actions/lesson.actions';
import * as player from '../actions/player.actions';

@Injectable()
export class ComputerEnemy {
  lessonDifficulty: number;
  lessonTextLength: number;
  startSub: Subscription;

  subs: Subscription[] = [];

  readonly id = 'computer';
  constructor(private store: Store<State>) {

  }

  connectToRace() {
    this.unsub();
    this.subs.push(this.store.select(fromRoot.getCurrentLessonDifficulty)
      .filter(d => !!d)
      .take(1)
      .subscribe(d => this.lessonDifficulty = d));

    this.subs.push(this.store.select(fromRoot.getCurrentLessonText)
      .filter(t => !!t)
      .take(1)
      .subscribe(t => this.lessonTextLength = t.length));

    this.subs.push(this.store.select(fromRoot.isLessonEnded)
      .filter(e => e)
      .take(1)
      .subscribe(e => {
        this.startSub.unsubscribe();
      }));

    this.subs.push(this.store.select(fromRoot.isLessonStarted)
      .filter(s => s)
      .take(1)
      .subscribe(() => this.start()));

    this.store.dispatch(new player.NewAction(this.id));
    this.store.dispatch(new player.ReadyAction(this.id));
  }
  start() {
    this.startSub = Observable.interval(1000 / (this.lessonDifficulty / 60))
      .timeInterval()
      .take(this.lessonTextLength)
      .subscribe(v => this.store.dispatch(new player.ProgressAction({
        id: this.id,
        progress: Math.floor(((v.value + 1) / this.lessonTextLength) * 100)
      })),
      () => { },
      () => this.store
        .dispatch(new lesson.EndAction()));
    this.subs.push(this.startSub);
  }

  unsub() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
