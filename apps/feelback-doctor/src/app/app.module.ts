import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { PatientListPage } from './pages/patient-list/patient-list.page';
import { PatientDetailsPage } from './pages/patient-details/patient-details.page';

@NgModule({
  declarations: [
    AppComponent,
    PatientListPage,
    PatientDetailsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
