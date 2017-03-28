import { SINGLETON as LessonListDAO } from './lesson-list.dao';

export default {
  path: '/api/lesson-list',
  middleware: function* () {
    this.body = LessonListDAO.getAll();
  }
};
