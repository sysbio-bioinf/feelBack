import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouting } from './app.routing';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { DatePipe } from '@angular/common';
import {
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { AppDateAdapter, AppDateFormats } from './date-format';
import { Platform } from '@angular/cdk/platform';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from '../initializer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    GraphQLModule,
    HttpClientModule,
    MaterialModule,
    MatNativeDateModule,
    KeycloakAngularModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: AppDateFormats,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService],
    },
  ],
})
export class AppModule {}
