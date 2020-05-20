import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreeningComponent } from '../../components/screening/screening.component';

const routes: Routes = [
  {
    path: 'screening/:screening',
    component: ScreeningComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ScreeningRoutingModule {}
