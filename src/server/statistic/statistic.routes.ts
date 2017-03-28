import { SINGLETON as StatisticDAO } from './statistic.dao';

export default {
  path: '/api/statistic',
  middleware: function* () {
    StatisticDAO.updateStatisticList(this.request.body);
    this.body = {};
  }
};
