import { SINGLETON as WordsDAO } from './words.dao';

export default {
  path: '/api/words',
  middleware: function* () {
    this.body = WordsDAO.getAll();
  }
};
