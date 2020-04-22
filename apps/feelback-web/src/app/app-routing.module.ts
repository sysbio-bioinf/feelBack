import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { StartPage } from './pages/start/start.page';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' }, // redirect to the start page
  {
    path: 'start',
    loadChildren: () =>
      import('./pages/start/start.module').then((m) => m.StartModule),
  },
  // { path: 'start', component: StartPage },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
