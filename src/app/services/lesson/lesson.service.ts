import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LessonListElement } from '../../models/lessons/lesson-list-element';
import { Lesson } from '../../models/lessons/lesson';

const LESSONS: Observable<Lesson[]> = Observable.of([
  {
    id: '1',
    title: 'Lesson 1',
    text: 'Lesson one text',
    difficulty: 100
  },
  {
    id: '2',
    title: 'Lesson 2',
    text: 'Lesson two text',
    difficulty: 200
  },
  {
    id: '3',
    title: 'Lesson 3',
    text: 'Lesson three text',
    difficulty: 300
  },
  {
    id: '4',
    title: 'Lesson 4',
    text: 'Lesson four text',
    difficulty: 400
  }
] as Lesson[]);

@Injectable()
export class LessonService {

  constructor() { }

  getLessonList(): Observable<LessonListElement[]> {
    return Observable.of([
      {
        id: '1',
        title: 'Lesson 1',
        isAvailable: true
      },
      {
        id: '2',
        title: 'Lesson 2',
        isAvailable: false
      },
      {
        id: '3',
        title: 'Lesson 3',
        isAvailable: false
      }, {
        id: '4',
        title: 'Lesson 4',
        isAvailable: false
      }
    ]);
  }

  getLesson(id: string): Observable<Lesson> {
    return LESSONS
      .map(lessons => lessons
        .find(lesson => lesson.id === id));
  }

}
