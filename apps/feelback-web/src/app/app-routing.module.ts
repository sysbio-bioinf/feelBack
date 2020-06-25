import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/start/start.module').then((m) => m.StartModule),
  },
  {
    path: 'imprint',
    loadChildren: () =>
      import('./pages/imprint/imprint.module').then((m) => m.ImprintModule),
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('./pages/privacy/privacy.module').then((m) => m.PrivacyModule),
  },
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
