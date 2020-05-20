import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { InstrumentPage } from './instrument.page';
import { ChooseInstrumentComponent } from '../../components/choose-instrument/choose-instrument.component';
import { InstrumentComponent } from '../../components/instrument/instrument.component';
import { ScreeningRoutingModule } from '../screening/screening.page.routing.module';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes), ScreeningRoutingModule],
  exports: [RouterModule],
})
export class InstrumentRoutingModule {}
