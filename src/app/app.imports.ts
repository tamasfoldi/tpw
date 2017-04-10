import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MdInputModule, MdButtonModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { LessonsEffects } from './effects/lessons.effects';
import { LessonEffects } from './effects/lesson.effects';
import { StatisticEffects } from './effects/statistic.effects';
import { reducer } from './reducers/index';
import { StoreRouterConnectingModule } from './router-store';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const APP_IMPORTS = [
  BrowserAnimationsModule,
  BrowserModule,
  FormsModule,
  HttpModule,

  MdButtonModule,
  MdInputModule,

  RouterModule.forRoot(routes),
  // StoreRouterConnectingModule,

  StoreModule.provideStore(reducer),
  !environment.production ? StoreDevtoolsModule.instrumentOnlyWithExtension() : [],

  EffectsModule.run(LessonsEffects),
  EffectsModule.run(LessonEffects),
  EffectsModule.run(StatisticEffects)
];
