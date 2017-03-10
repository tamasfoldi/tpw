import { LessonService } from './services/lesson/lesson.service';
import { LessonGuard } from './guards/lesson.guard';
import { Enemy } from './enemy/enemy';

export const APP_PROVIDERS = [
  LessonService,
  LessonGuard,
  Enemy
];
