import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouting } from './app.routing';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    GraphQLModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
