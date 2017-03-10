import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Lesson } from '../../models/lessons/lesson';
import { State } from '../../reducers/index';
import * as fromRoot from '../../reducers/index';
import * as lesson from '../../actions/lesson.actions';
import { Statistic } from '../../models/statistic/statistic';
import { EnemyProgress } from '../../models/enemy-progress';

@Component({
  selector: 'tpw-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss']
})
export class LessonViewComponent implements OnInit {

  selectedLesson$: Observable<Lesson>;
  typedText$: Observable<string>;
  isLessonEnded$: Observable<boolean>;
  statistic$: Observable<Statistic>;
  progress$: Observable<number>;
  enemiesProgress$: Observable<EnemyProgress[]>;

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.initalizeComputerEnemy();
    this.initializeDatasFromStore();
    this.store.dispatch(new lesson.StartAction());
    setTimeout(() => {
      this.store.dispatch(new lesson.EndAction());
    }, 1000);
  }

  handleKeyup(event: KeyboardEvent) {
    this.store.dispatch(new lesson.NewKeyAction(event));
  }

  initalizeComputerEnemy() {
    this.store.dispatch(new lesson.NewPlayerAction('computer'));
  }

  initializeDatasFromStore() {
    this.selectedLesson$ = this.store.select(fromRoot.getCurrentLesson);
    this.typedText$ = this.store.select(fromRoot.getTypedText);
    this.isLessonEnded$ = this.store.select(fromRoot.wasLessonTyped);
    this.statistic$ = this.store.select(fromRoot.getLessonStatistic);
    this.progress$ = this.store.select(fromRoot.getLessonProgress);
    this.enemiesProgress$ = this.store.select(fromRoot.getLessonEnemiesProgress);
  }
}

