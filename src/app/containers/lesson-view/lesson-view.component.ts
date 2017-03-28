import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { State } from '../../reducers/index';
import * as fromRoot from '../../reducers/index';
import * as player from '../../actions/player.actions';
import { Lesson } from '../../../common/lesson';
import { Statistic } from '../../../common/statistic';
import { Player } from '../../../common/player';
import { ComputerEnemy } from '../../computer-enemy/computer-enemy';

@Component({
  selector: 'tpw-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss']
})
export class LessonViewComponent implements OnInit {

  selectedLesson$: Observable<Lesson>;
  typedText$: Observable<string>;
  isLessonEnded$: Observable<boolean>;
  isLessonStarted$: Observable<boolean>;
  isStarting$: Observable<boolean>;
  statistic$: Observable<Statistic>;
  progress$: Observable<number>;
  enemiesProgress$: Observable<number[]>;

  enemy: ComputerEnemy;

  readonly playerId = 'player';
  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.initializePlayers();
    this.initializeDatasFromStore();
  }

  initializePlayers() {
    this.store.dispatch(new player.NewAction(this.playerId));
    this.enemy = new ComputerEnemy(this.store);
  }

  initializeDatasFromStore() {
    this.selectedLesson$ = this.store.select(fromRoot.getCurrentLesson);
    this.typedText$ = this.store.select(fromRoot.getTypedText);
    this.isLessonEnded$ = this.store.select(fromRoot.isLessonEnded);
    this.isLessonStarted$ = this.store.select(fromRoot.isLessonStarted);
    this.statistic$ = this.store.select(fromRoot.getLessonStatistic);
    this.progress$ = this.store.select(fromRoot.getLessonProgress);
    this.enemiesProgress$ = this.store.select(fromRoot.getLessonEnemiesProgress);
    this.isStarting$ = this.store.select(fromRoot.isAllPlayerReady);
  }

  handleKeyup(event: KeyboardEvent) {
    this.store.dispatch(new player.KeyAction(event));
  }

  handleReady() {
    this.store.dispatch(new player.ReadyAction(this.playerId));
  }
}

