import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LessonListElement } from '../../models/lessons/lesson-list-element';
import { Lesson } from '../../models/lessons/lesson';

const LESSONS: Observable<Lesson[]> = Observable.of([
  {
    id: '1',
    title: 'Lesson 1',
    text: 'Lesson 1 text'
  },
  {
    id: '2',
    title: 'Lesson 2',
    text: 'Lesson 2 text'
  },
  {
    id: '3',
    title: 'Lesson 3',
    text: 'Lesson 3 text'
  }, {
    id: '4',
    title: 'Lesson 4',
    text: 'Lesson 4 text'
  }
]);

@Injectable()
export class LessonService {

  constructor() { }

  getLessonList(): Observable<LessonListElement[]> {
    return Observable.of([
      {
        id: '1',
        title: 'Lesson 1',
        isCompleted: true
      },
      {
        id: '2',
        title: 'Lesson 2',
        isCompleted: true
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

  getLesson(id: string): Observable<Lesson> {
    return LESSONS
      .map(lessons => lessons
        .find(lesson => lesson.id === id));
  }

}
