import { ErrorPage } from './error.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'apps/feelback-doctor/src/app/modules/material.module';
import { ComponentsModule } from 'apps/feelback-doctor/src/app/components/components.module';
import { ErrorRouting } from './error.routing';

@NgModule({
  declarations: [ErrorPage],
  imports: [CommonModule, MaterialModule, ComponentsModule, ErrorRouting],
})
export class ErrorModule {}
