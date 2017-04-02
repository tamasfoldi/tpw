import { StatisticData } from '../../common/statistic';
import { STATISTIC } from '../../app/mock-http/mock-http-data';
import { Mistakes } from '../../common/mistake';
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
    console.log(this.getMistakes());
  }

  getMistakes() {
    return this.STATISTIC_DB.mapReduce(
      (item: StatisticData) => item.mistakes,
      a => a.reduce((prev, curr) => Mistakes.add(prev, curr) ));
  }
}

export const SINGLETON: StatisticDAO = new StatisticDAO();
