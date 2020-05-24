import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { ResultPage } from './result.page';

const routes: Routes = [
  {
    path: 'patients/:patient/instruments/:instrument/screenings',
    component: MainLayout,
    children: [
      {
        path: ':screening',
        component: ResultPage,
        data: { animation: 'Result' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultRouting {}
