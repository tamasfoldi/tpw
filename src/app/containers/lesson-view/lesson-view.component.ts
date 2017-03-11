import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Lesson } from '../../models/lessons/lesson';
import { State } from '../../reducers/index';
import * as fromRoot from '../../reducers/index';
import * as lesson from '../../actions/lesson.actions';
import { Statistic } from '../../models/statistic/statistic';
import { Player } from '../../models/player';
import { ComputerEnemy } from '../../enemy/enemy';

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
    this.store.dispatch(new lesson.NewPlayerAction(this.playerId))
    this.initalizeComputerEnemy();
    this.initializeDatasFromStore();
  }

  handleKeyup(event: KeyboardEvent) {
    this.store.dispatch(new lesson.NewKeyAction(event));
  }

  initalizeComputerEnemy() {
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

  handleReady() {
    this.store.dispatch(new lesson.ReadyAction(this.playerId));
  }
}

