import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InstrumentsPage } from './instruments.page';

const routes: Routes = [
  {
    path: 'patients/:patient',
    redirectTo: 'patients/:patient/instruments',
    pathMatch: 'full',
  },
  {
    path: 'patients/:patient/instruments',
    component: InstrumentsPage,
    data: { animation: 'Instruments' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrumentsRouting {}
