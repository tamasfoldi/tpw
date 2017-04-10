import { SINGLETON as LessonDAO } from './lesson.dao';
import { Serialize } from 'cerialize';
import { Lesson } from '../../common/lesson';

export default {
  path: '/api/lesson/:id',
  middleware: function* () {
    this.body = Serialize(LessonDAO.findById(this.params['id']), Lesson);
  }
};
