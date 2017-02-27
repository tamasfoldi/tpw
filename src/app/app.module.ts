import { NgModule } from '@angular/core';

import { APP_DECLRATATIONS } from './app.declarations';
import { APP_IMPORTS } from './app.imports';
import { APP_PROVIDERS } from './app.providers';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    APP_DECLRATATIONS
  ],
  imports: [
    APP_IMPORTS
  ],
  providers: [
    APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
