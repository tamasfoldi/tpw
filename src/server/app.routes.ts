import * as Router from 'koa-router';
import * as fs from 'fs';
import LESSON_LIST_ROUTE from './lesson-list/lesson-list.routes';
const ROUTER = new Router();

const LOAD_HTML = function () {
  return new Promise(function (resolve, reject) {
    fs.readFile('./dist/client/index.html', { 'encoding': 'utf8' }, function (err, data) {
      if (err) {
        return reject(err);
      };
      resolve(data);
    });
  });
};

ROUTER.get(LESSON_LIST_ROUTE.path, LESSON_LIST_ROUTE.middleware);

ROUTER.get(/^\/(.*)(?:\/|$)/, function* (next) {
  if (this.request.url.startsWith('/api')) {
    yield next;
  } else {
    this.body = yield LOAD_HTML();
    console.log(this.body);
  }
});

export default ROUTER;