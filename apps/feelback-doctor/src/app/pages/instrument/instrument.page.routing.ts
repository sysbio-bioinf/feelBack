import { Routes } from '@angular/router';
import { InstrumentPage } from './instrument.page';
import { ChooseInstrumentComponent } from '../../components/choose-instrument/choose-instrument.component';
import { InstrumentComponent } from '../../components/instrument/instrument.component';
import { ScreeningModule } from '../screening/screening.page.module';
import { ScreeningRouting } from '../screening/screening.page.routing';

export const InstrumentRouting: Routes = [
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
