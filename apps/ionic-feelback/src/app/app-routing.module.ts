import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'start',
    loadChildren: () =>
      import('./pages/start/start.module').then((m) => m.StartPageModule),
  },
  {
    path: 'tutorial',
    loadChildren: () =>
      import('./pages/tutorial/tutorial.module').then(
        (m) => m.TutorialPageModule,
      ),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./pages/menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: 'auth',
    children: [
      {
        path: 'form',
        loadChildren: () =>
          import('./pages/login-form/login-form.module').then(
            (m) => m.LoginFormPageModule,
          ),
      },
      {
        path: 'qrcode',
        loadChildren: () =>
          import('./pages/login-qr/login-qr.module').then(
            (m) => m.LoginQrPageModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
