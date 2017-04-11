import { Routes } from '@angular/router';

import { LessonListViewComponent } from './containers/lesson-list-view/lesson-list-view.component';
import { LessonViewComponent } from './containers/lesson-view/lesson-view.component';
import { LessonGuard } from './guards/lesson.guard';

export const routes: Routes = [
  {
    path: '',
    component: LessonListViewComponent
  },
  {
    path: 'lesson/:id',
    component: LessonViewComponent,
    canActivate: [LessonGuard]
  }
];
