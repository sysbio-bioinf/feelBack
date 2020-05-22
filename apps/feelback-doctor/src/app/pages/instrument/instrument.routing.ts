import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { InstrumentPage } from './instrument.page';
import { ChooseInstrumentComponent } from '../../components/instrument/choose-instrument/choose-instrument.component';
import { InstrumentWrapperComponent } from '../../components/instrument/instrument-wrapper/instrument-wrapper.component';

const routes: Routes = [
  {
    path: 'patients',
    component: MainLayout,
    children: [
      {
        path: ':patient',
        redirectTo: ':patient/instruments',
        pathMatch: 'full',
      },
      {
        path: ':patient/instruments',
        component: InstrumentPage,
        children: [
          {
            path: '',
            component: ChooseInstrumentComponent,
          },
          {
            path: ':instrument',
            redirectTo: ':instrument/screenings',
            pathMatch: 'full',
          },
          {
            path: ':instrument/screenings',
            component: InstrumentWrapperComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrumentRouting {}
