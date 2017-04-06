import { StatisticData } from '../../common/statistic';
import { STATISTIC } from '../../app/mock-http/mock-http-data';
class StatisticDAO {
  private STATISTIC_DB: LokiCollection<{}>;

  configure(DB: Loki) {
    const instance = this;
    DB.loadDatabase({}, function () {
      instance.STATISTIC_DB = DB.getCollection('statistic');
      if (!instance.STATISTIC_DB) {
        instance.STATISTIC_DB = DB.addCollection('statistic');
      }
    });
  }

  updateStatisticList(stat: StatisticData) {
    this.STATISTIC_DB.insert(stat);
  }

  getAll() {
    return this.STATISTIC_DB.data;
  }
}

export const SINGLETON: StatisticDAO = new StatisticDAO();
