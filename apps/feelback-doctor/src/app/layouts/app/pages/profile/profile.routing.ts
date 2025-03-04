import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfilePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRouting {}
