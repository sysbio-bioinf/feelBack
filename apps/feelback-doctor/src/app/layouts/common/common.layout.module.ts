import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../modules/material.module';
import { ComponentsModule } from '../../components/components.module';
import { CommonLayout } from './common.layout';
import { CommonPagesModule } from './pages/common.pages.module';
import { CommonLayoutRouting } from './common.layout.routing';

@NgModule({
  declarations: [CommonLayout],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ComponentsModule,
    CommonPagesModule,
    CommonLayoutRouting,
  ],
})
export class CommonLayoutModule {}
