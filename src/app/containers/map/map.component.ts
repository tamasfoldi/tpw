import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/index';
import { Observable } from 'rxjs/Rx';
import { LessonListElement } from '../../../common/lesson-list-element';
import { Lesson } from '../../../common/lesson';
import * as fromRoot from '../../reducers/index';
import * as lessons from '../../actions/lessons.actions';

@Component({
  selector: 'tpw-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lessons$: Observable<LessonListElement[]>;
  isLoading$: Observable<boolean>;
  constructor(private store: Store<State>, private router: Router) { }

  ngOnInit() {
    this.lessons$ = this.store.select(fromRoot.getLessonList);
    this.isLoading$ = this.store.select(fromRoot.isLoadingLessons);
  }

  handleLessonSelect(id: string) {
    this.router.navigate(['/lesson', id]);
  }

}
