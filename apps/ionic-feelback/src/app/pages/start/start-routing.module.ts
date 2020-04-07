import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(HomeRoutes)],
  exports: [RouterModule],
})
export class StartRoutingModule {}
