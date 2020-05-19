import { ErrorPage } from './error.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/material.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [ErrorPage],
  imports: [CommonModule, MaterialModule, ComponentsModule],
})
export class ErrorModule {}
