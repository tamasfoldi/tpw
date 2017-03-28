import * as Koa from 'koa';
import * as StaticFiles from 'koa-static';
import * as BodyParser from 'koa-bodyparser';
import exceptionHandler from './exception-handler.middleware';
import ROUTER from './app.routes';
import * as Lokijs from 'lokijs';
import { SINGLETON as LessonListDAO } from './lesson-list/lesson-list.dao';

const DB = new Lokijs('lesson-list.json', {
  autosave: true
});

LessonListDAO.configure(DB);

const CLIENT_FILES = './dev/client/';

const SERVER = new Koa();

// middlewares
SERVER.use(BodyParser());
SERVER.use(StaticFiles(CLIENT_FILES));
SERVER.use(exceptionHandler);
SERVER.use(ROUTER.routes());

SERVER.listen(3000);
