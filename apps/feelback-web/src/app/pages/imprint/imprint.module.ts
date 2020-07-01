import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared.module';
import { ImprintRoutingModule } from './imprint-routing.module';
import { ImprintPage } from './imprint.page';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [ImprintPage],
  imports: [
    CommonModule,
    SharedModule,
    ImprintRoutingModule,
    MarkdownModule.forChild(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImprintModule {}
