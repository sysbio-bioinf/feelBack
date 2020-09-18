import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../../components/components.module';
import { MaterialModule } from '../../../../material.module';
import { ImprintPage } from './imprint.page';
import { ImprintRouting } from './imprint.routing';

@NgModule({
  declarations: [ImprintPage],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MaterialModule,
    ImprintRouting,
  ],
})
export class ImprintModule {}
