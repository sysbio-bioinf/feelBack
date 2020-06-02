import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from './../../../../components/components.module';
import { MaterialModule } from './../../../../material.module';
import { ErrorPage } from './error.page';
import { ErrorRouting } from './error.routing';

@NgModule({
  declarations: [ErrorPage],
  imports: [CommonModule, MaterialModule, ComponentsModule, ErrorRouting],
})
export class ErrorModule {}
