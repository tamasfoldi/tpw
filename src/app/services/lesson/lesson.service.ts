import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LessonListElement } from '../../models/lessons/lesson-list-element';

@Injectable()
export class LessonService {

  constructor() { }

  getLessonList(): Observable<LessonListElement[]> {
    return Observable.of([]);
  }

}
