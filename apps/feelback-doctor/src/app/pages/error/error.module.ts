import { ErrorPage } from './error.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/material.module';

@NgModule({
  declarations: [ErrorPage],
  imports: [CommonModule, MaterialModule],
})
export class ErrorModule {}
