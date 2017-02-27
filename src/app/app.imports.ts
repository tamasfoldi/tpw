import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { LessonEffects } from './effects/lesson.effets';
import { reducer } from './reducers/index';
import { connectToStore, StoreConnectedToRouter } from './router-store';
import { routes } from './app.routes';

export const APP_IMPORTS = [
  BrowserModule,
  FormsModule,
  HttpModule,
  RouterModule.forRoot(connectToStore(routes)),
  StoreConnectedToRouter.provideStore(reducer),

  StoreModule.provideStore(reducer),
  StoreDevtoolsModule.instrumentOnlyWithExtension(),


  EffectsModule.run(LessonEffects)
];