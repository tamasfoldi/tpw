import { Routes } from '@angular/router';

import { MapComponent } from './containers/map/map.component';
import { LessonViewComponent } from './containers/lesson-view/lesson-view.component';
import { LessonGuard } from './guards/lesson.guard';

export const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'lesson/:id',
    component: LessonViewComponent,
    canActivate: [LessonGuard]
  }
];
