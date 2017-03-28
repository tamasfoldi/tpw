import { SINGLETON as LessonDAO } from './lesson.dao';

export default {
  path: '/api/lesson/:id',
  middleware: function* () {
    this.body = LessonDAO.findById(this.params['id']);
  }
};
