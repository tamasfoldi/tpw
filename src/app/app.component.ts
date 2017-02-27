import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from './reducers/index';
import * as lesson from './actions/lesson.actions';
@Component({
  selector: 'tpw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
