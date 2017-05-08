import { Lesson } from '../../common/lesson';
import { LESSONS } from '../../app/mock-http/mock-http-data';
import { SINGLETON as WordsDAO } from '../words/words.dao';

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

  findById(id: string): Lesson {
    const retLesson: Lesson = this.LESSON_DB.findOne({ id }) as Lesson;
    retLesson.text = WordsDAO.getWordsForLetters(retLesson.includedLetters, 20).toString().replace(/,/g, ' ');
    return retLesson;
  }
}

export const SINGLETON: LessonDAO = new LessonDAO();
