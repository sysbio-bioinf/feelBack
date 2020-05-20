import { Routes } from '@angular/router';
import { ScreeningComponent } from '../../components/screening/screening.component';

export const ScreeningRouting: Routes = [
  {
    path: 'screening/:screening',
    component: ScreeningComponent,
  },
];
