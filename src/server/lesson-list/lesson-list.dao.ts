import { LessonListElement } from '../../common/lesson-list-element';
import { LESSON_LIST } from '../../app/mock-http/mock-http-data';
class LessonListDAO {
  private LESSON_LIST_DB: LokiCollection<{}>;

  configure(DB: Loki) {
    const instance = this;
    DB.loadDatabase({}, function () {
      instance.LESSON_LIST_DB = DB.getCollection('lesson_list');
      if (!instance.LESSON_LIST_DB) {
        instance.LESSON_LIST_DB = DB.addCollection('lesson_list');
        instance.LESSON_LIST_DB.insert(LESSON_LIST);
      }
    });
  }

  getAll(): LessonListElement[] {
    return this.LESSON_LIST_DB.data as LessonListElement[];
  }
}

export const SINGLETON: LessonListDAO = new LessonListDAO();
