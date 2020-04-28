import { NgModule } from '@angular/core';
import { LoginLayout } from './login/login.layout';
import { MainLayout } from './main/main.layout';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../modules/shared.module';
import { MaterialModule } from '../modules/material.module';

@NgModule({
  declarations: [LoginLayout, MainLayout],
  imports: [RouterModule, SharedModule, MaterialModule, CommonModule],
})
export class LayoutsModule {}
