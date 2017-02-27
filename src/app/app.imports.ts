import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { LessonEffects } from './effects/lesson.effets';
import { reducer } from './reducers/index';

export const APP_IMPORTS = [
  BrowserModule,
  FormsModule,
  HttpModule,

  StoreModule.provideStore(reducer),
  StoreDevtoolsModule.instrumentOnlyWithExtension(),


  EffectsModule.run(LessonEffects)
];
