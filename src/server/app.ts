import * as Koa from 'koa';
import * as StaticFiles from 'koa-static';
import * as BodyParser from 'koa-bodyparser';
import exceptionHandler from './exception-handler.middleware';
import ROUTER from './app.routes';
import * as Lokijs from 'lokijs';
import { SINGLETON as LessonListDAO } from './lesson-list/lesson-list.dao';
import { SINGLETON as LessonDAO } from './lesson/lesson.dao';
import { SINGLETON as StatisticDAO } from './statistic/statistic.dao';

const LESSON_LIST_DB = new Lokijs('db/lesson-list.json', {
  autosave: true
});
const LESSONS_DB = new Lokijs('db/lessons.json', {
  autosave: true
});
const STATISTIC_DB = new Lokijs('db/statistic.json', {
  autosave: true
});

LessonListDAO.configure(LESSON_LIST_DB);
LessonDAO.configure(LESSONS_DB);
StatisticDAO.configure(STATISTIC_DB);

const CLIENT_FILES = './dev/client/';

const SERVER = new Koa();

// middlewares
SERVER.use(BodyParser());
SERVER.use(StaticFiles(CLIENT_FILES));
SERVER.use(exceptionHandler);
SERVER.use(ROUTER.routes());

SERVER.listen(3000);
