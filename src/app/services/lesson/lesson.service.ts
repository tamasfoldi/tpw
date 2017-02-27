import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LessonListElement } from '../../models/lessons/lesson-list-element';

@Injectable()
export class LessonService {

  constructor() { }

  getLessonList(): Observable<LessonListElement[]> {
    return Observable.of([
      {
        id: '1',
        title: 'Lesson 1',
        isCompleted: false
      },
      {
        id: '2',
        title: 'Lesson 2',
        isCompleted: false
      },
      {
        id: '3',
        title: 'Lesson 3',
        isCompleted: false
      }, {
        id: '4',
        title: 'Lesson 4',
        isCompleted: false
      }
    ]);
  }

}
