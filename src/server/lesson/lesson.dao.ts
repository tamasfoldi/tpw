import { Lesson } from '../../common/lesson';
import { LESSONS } from '../../app/mock-http/mock-http-data';

class LessonDAO {
  private LESSON_DB: LokiCollection<{}>;

  configure(DB: Loki) {
    const instance = this;
    DB.loadDatabase({}, function () {
      instance.LESSON_DB = DB.getCollection('lesson');
      if (!instance.LESSON_DB) {
        instance.LESSON_DB = DB.addCollection('lesson');
        instance.LESSON_DB.insert(LESSONS);
      }
    });
  }

  findById(id: string): any {
    return this.LESSON_DB.findOne({ id });
  }
}

export const SINGLETON: LessonDAO = new LessonDAO();
