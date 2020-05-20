import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { InstrumentPage } from './instrument.page';
import { ChooseInstrumentComponent } from '../../components/choose-instrument/choose-instrument.component';
import { InstrumentComponent } from '../../components/instrument/instrument.component';
import { ScreeningComponent } from '../../components/screening/screening.component';

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
            children: [
              {
                path: 'screening/:screening',
                component: ScreeningComponent,
              },
            ],
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
