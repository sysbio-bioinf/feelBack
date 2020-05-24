import { ErrorPage } from './error.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorRouting } from './error.routing';
import { MaterialModule } from 'apps/feelback-doctor/src/app/material.module';
import { ComponentsModule } from 'apps/feelback-doctor/src/app/components/components.module';

@NgModule({
  declarations: [ErrorPage],
  imports: [CommonModule, MaterialModule, ComponentsModule, ErrorRouting],
})
export class ErrorModule {}
