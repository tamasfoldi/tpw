import { SINGLETON as LessonListDAO } from './lesson-list.dao';

export const GET_LESSONS_LIST = {
  path: '/api/lesson-list',
  middleware: function* () {
    this.body = LessonListDAO.getAll();
  }
};

export const UPDATE_AVAILABILITY = {
  path: '/api/lesson-list/:id',
  middleware: function* () {
    this.body = LessonListDAO.updateAvailability(this.params['id']);
  }
};
