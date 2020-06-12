import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScreeningsPage } from './screenings.page';

const routes: Routes = [
  {
    path: 'patients/:patient/instruments/:instrument',
    redirectTo: 'patients/:patient/instruments/:instrument/screenings',
    pathMatch: 'full',
  },
  {
    path: 'patients/:patient/instruments/:instrument/screenings',
    component: ScreeningsPage,
    data: { animation: 'Screenings' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreeningsRouting {}
