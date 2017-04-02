import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { STATISTIC_BASE_URL } from '../../services/tokens';
import { Statistic } from '../../../common/statistic';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StatisticsService {

  constructor(private http: Http, @Inject(STATISTIC_BASE_URL) private baseUrl: string) { }

  newLessonStatistic(stat: Statistic): Observable<void> {
    return this.http.post(`${this.baseUrl}`, stat)
      .map(rsp => rsp.json())
  }

}
