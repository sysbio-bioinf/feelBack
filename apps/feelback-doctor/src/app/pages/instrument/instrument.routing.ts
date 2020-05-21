import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { InstrumentPage } from './instrument.page';
import { ChooseInstrumentComponent } from '../../components/choose-instrument/choose-instrument.component';
import { InstrumentComponent } from '../../components/instrument/instrument.component';

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
          { path: 'instruments/:instrument', redirectTo: 'instruments/:instrument/screenings', pathMatch: 'full' },
          {
            path: 'instruments/:instrument/screenings',
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
