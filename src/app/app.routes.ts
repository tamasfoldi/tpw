import { Routes } from '@angular/router';

import { MapComponent } from './containers/map/map.component';
import { LessonViewComponent } from './containers/lesson-view/lesson-view.component';

export const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
  {
    path: 'lesson/:id',
    component: LessonViewComponent
  }
];
