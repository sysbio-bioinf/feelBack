import { NgModule } from '@angular/core';
import { LoginLayout } from './login/login.layout';
import { MainLayout } from './main/main.layout';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../modules/shared.module';

@NgModule({
  declarations: [LoginLayout, MainLayout],
  imports: [RouterModule, SharedModule, MatDividerModule, CommonModule],
})
export class LayoutsModule {}
