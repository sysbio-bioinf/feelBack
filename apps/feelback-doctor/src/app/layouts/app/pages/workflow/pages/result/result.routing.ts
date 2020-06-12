import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResultPage } from './result.page';

const routes: Routes = [
  {
    path: 'patients/:patient/instruments/:instrument/screenings/:screening',
    component: ResultPage,
    data: { animation: 'Result' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultRouting {}
