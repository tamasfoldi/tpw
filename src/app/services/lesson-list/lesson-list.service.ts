import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LESSONLIST_BASE_URL } from '../tokens';
import { LessonListElement } from '../../../common/lesson-list-element';

@Injectable()
export class LessonListService {

  constructor(private http: Http, @Inject(LESSONLIST_BASE_URL) private baseUrl: string) { }

  getLessonList(): Observable<LessonListElement[]> {
    return this.http.get(`${this.baseUrl}`)
      .map(rsp => rsp.json());
  }

  setAvailable(id: string): Observable<void> {
    return this.http.put(`${this.baseUrl}/${id}`, {})
      .map(rsp => rsp.json());
  }
}
