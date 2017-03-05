import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Lesson } from '../../models/lessons/lesson';
import { State } from '../../reducers/index';
import * as fromRoot from '../../reducers/index';
import * as lesson from '../../actions/lesson.actions';

@Component({
  selector: 'tpw-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss']
})
export class LessonViewComponent implements OnInit {

  selectedLesson$: Observable<Lesson>;
  typedText$: Observable<string>;
  isInputDisabled$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.selectedLesson$ = this.store.select(fromRoot.getCurrentLesson);
    this.typedText$ = this.store.select(fromRoot.getTypedText);
    this.isInputDisabled$ = this.store.select(fromRoot.wasLessonTyped);
  }

  handleKeyup(event: KeyboardEvent) {
    this.store.dispatch(new lesson.NewKeyAction(event));
  }
}

