import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { LessonListElement } from '../../../common/lesson-list-element';
import { Lesson } from '../../../common/lesson';
import { Http } from '@angular/http';
import { LESSON_BASE_URL } from '../tokens';

@Injectable()
export class LessonService {

  constructor(private http: Http, @Inject(LESSON_BASE_URL) private baseUrl: string) { }

  getLesson(id: string): Observable<Lesson> {
    return this.http.get(`${this.baseUrl}/${id}`)
      .map(rsp => rsp.json());
  }

}
