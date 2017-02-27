import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/index';
import { Observable } from 'rxjs/Rx';
import { LessonListElement } from '../../models/lessons/lesson-list-element';
import * as fromRoot from '../../reducers/index';
import * as lesson from '../../actions/lesson.actions';

@Component({
  selector: 'tpw-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lessons$: Observable<LessonListElement[]>;
  isLoading$: Observable<boolean>;
  constructor(private store: Store<State>) {
    this.store.dispatch(new lesson.LoadListAction());
  }

  ngOnInit() {
    this.lessons$ = this.store.select(fromRoot.getLessonList);
    this.isLoading$ = this.store.select(fromRoot.isLoading);
  }

}
