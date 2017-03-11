import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Lesson } from '../../models/lessons/lesson';
import { State } from '../../reducers/index';
import * as fromRoot from '../../reducers/index';
import * as lesson from '../../actions/lesson.actions';
import { Statistic } from '../../models/statistic/statistic';
import { EnemyProgress } from '../../models/enemy-progress';
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
  statistic$: Observable<Statistic>;
  progress$: Observable<number>;
  enemiesProgress$: Observable<EnemyProgress[]>;

  startButtonText = 'START';
  startInterval;
  startInProgress = false;

  enemy: ComputerEnemy;
  constructor(private store: Store<State>) {
  }

  ngOnInit() {
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

  }

  startHandler() {
    this.startInProgress = true;
    let secTilStart = 3;
    this.startButtonText = `Starts in ${secTilStart}...`;
    this.isLessonStarted$
      .filter(s => s)
      .take(1)
      .subscribe(() => {
        clearInterval(this.startInterval);
      });

    this.startInterval = setInterval(() => {
      secTilStart--;
      if (secTilStart > 0) {
        this.startButtonText = `Starts in ${secTilStart}...`;
      } else {
        this.startButtonText = 'GO!';
        this.store.dispatch(new lesson.StartAction());
      }
    }, 1000);
  }
}

