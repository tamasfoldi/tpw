import { LessonService } from './services/lesson/lesson.service';
import { LessonGuard } from './guards/lesson.guard';

export const APP_PROVIDERS = [
  LessonService,

  LessonGuard
];
