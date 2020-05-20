import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { ChooseInstrumentComponent } from '../../components/choose-instrument/choose-instrument.component';
import { InstrumentComponent } from '../../components/instrument/instrument.component';
import { InstrumentPage } from './instrument.page';

const routes: Routes = [
  {
    path: 'patients',
    component: MainLayout,
    children: [
      {
        path: ':patient',
        component: InstrumentPage,
        children: [
          { path: '', redirectTo: 'instruments', pathMatch: 'full' },
          {
            path: 'instruments',
            component: ChooseInstrumentComponent,
          },
          {
            path: 'instruments/:instrument',
            component: InstrumentComponent,
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
