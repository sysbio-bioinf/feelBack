import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ErrorPage } from './error.page';

const routes: Routes = [{ path: 'error', component: ErrorPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRouting {}
