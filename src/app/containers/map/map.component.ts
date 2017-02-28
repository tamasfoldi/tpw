import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/index';
import { Observable } from 'rxjs/Rx';
import { LessonListElement } from '../../models/lessons/lesson-list-element';
import * as fromRoot from '../../reducers/index';
import * as lesson from '../../actions/lesson.actions';
import { Lesson } from '../../models/lessons/lesson';

@Component({
  selector: 'tpw-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lessons$: Observable<LessonListElement[]>;
  isLoading$: Observable<boolean>;
  constructor(private store: Store<State>, private router: Router) {
    this.store.dispatch(new lesson.LoadListAction());
  }

  ngOnInit() {
    this.lessons$ = this.store.select(fromRoot.getLessonList);
    this.isLoading$ = this.store.select(fromRoot.isLoading);
  }

  handleLessonSelect(id: string) {
    this.router.navigate(['/lesson', id]);
  }

}
