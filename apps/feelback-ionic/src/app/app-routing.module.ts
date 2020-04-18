import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login-qrcode/login-qrcode.module').then(
            (m) => m.LoginQrcodePageModule,
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
