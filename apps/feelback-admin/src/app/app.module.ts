import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { OrganizationsListPage } from './pages/organizations-list/organizations-list.page';
import { OrganizationsDetailPage } from './pages/organizations-detail/organizations-detail.page';
import { InstrumentsListPage } from './pages/instruments-list/instruments-list.page';
import { InstrumentsDetailPage } from './pages/instruments-detail/instruments-detail.page';
import { DoctorsDetailPage } from './pages/doctors-detail/doctors-detail.page';
import { DoctorsListPage } from './pages/doctors-list/doctors-list.page';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    OrganizationsListPage,
    OrganizationsDetailPage,
    InstrumentsListPage,
    InstrumentsDetailPage,
    DoctorsDetailPage,
    DoctorsListPage,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
