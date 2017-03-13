import { LessonService } from './services/lesson/lesson.service';
import { LessonGuard } from './guards/lesson.guard';
import { MyDomRenderer } from './services/renderer/my-dom-renderer';




export const APP_PROVIDERS = [
  LessonService,
  LessonGuard,
  MyDomRenderer
];
