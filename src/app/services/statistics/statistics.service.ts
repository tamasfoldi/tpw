import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { STATISTIC_BASE_URL } from '../../services/tokens';
import { Statistic } from '../../models/statistic/statistic';

@Injectable()
export class StatisticsService {

  constructor(private http: Http, @Inject(STATISTIC_BASE_URL) private baseUrl: string) { }

  newLessonStatistic(stat: Statistic) {
    return this.http.post(`${this.baseUrl}/statistic`, stat)
      .map(rsp => rsp.json());
  }

}
