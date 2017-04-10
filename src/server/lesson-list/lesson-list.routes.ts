import { SINGLETON as LessonListDAO } from './lesson-list.dao';
import { Serialize } from 'cerialize';
import { LessonListElement } from '../../common/lesson-list-element';

export const GET_LESSONS_LIST = {
  path: '/api/lesson-list',
  middleware: function* () {
    this.body = LessonListDAO.getAll().map(e => Serialize(e, LessonListElement));
  }
};

export const UPDATE_AVAILABILITY = {
  path: '/api/lesson-list/:id',
  middleware: function* () {
    this.body = LessonListDAO.updateAvailability(this.params['id']);
  }
};
