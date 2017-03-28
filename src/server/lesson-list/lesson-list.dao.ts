import { LessonListElement } from '../../common/lesson-list-element';

class LessonListDAO {
  private LESSON_LIST_DB: LokiCollection<{}>;

  configure(DB: Loki) {
    const instance = this;
    DB.loadDatabase({}, function () {
      instance.LESSON_LIST_DB = DB.getCollection('lesson_list');
      if (!instance.LESSON_LIST_DB) {
        instance.LESSON_LIST_DB = DB.addCollection('lesson_list');
      }
    });
  }

  getAll(): LessonListElement[] {
    return this.LESSON_LIST_DB.data as LessonListElement[];
  }
}

export const SINGLETON: LessonListDAO = new LessonListDAO();
