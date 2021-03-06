import * as Router from 'koa-router';
import * as fs from 'fs';
import * as lessonListRoutes from './lesson-list/lesson-list.routes';
import LESSON_ROUTE from './lesson/lesson.routes';
import STATISTIC_ROUTE from './statistic/statistic.routes';
import WORDS from './words/words.routes';
const ROUTER = new Router();

const LOAD_HTML = function () {
  return new Promise(function (resolve, reject) {
    fs.readFile('./dev/client/index.html', { 'encoding': 'utf8' }, function (err, data) {
      if (err) {
        return reject(err);
      };
      resolve(data);
    });
  });
};

ROUTER.get(lessonListRoutes.GET_LESSONS_LIST.path, lessonListRoutes.GET_LESSONS_LIST.middleware);
ROUTER.put(lessonListRoutes.UPDATE_AVAILABILITY.path, lessonListRoutes.UPDATE_AVAILABILITY.middleware);
ROUTER.get(LESSON_ROUTE.path, LESSON_ROUTE.middleware);
ROUTER.get(WORDS.path, WORDS.middleware);
ROUTER.post(STATISTIC_ROUTE.path, STATISTIC_ROUTE.middleware);

ROUTER.get(/^\/(.*)(?:\/|$)/, function* (next) {
  if (this.request.url.startsWith('/api')) {
    yield next;
  } else {
    this.body = yield LOAD_HTML();
    console.log(this.body);
  }
});

export default ROUTER;
