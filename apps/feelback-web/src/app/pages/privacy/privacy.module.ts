import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared.module';
import { MarkdownModule } from 'ngx-markdown';
import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyPage } from './privacy.page';

@NgModule({
  declarations: [PrivacyPage],
  imports: [
    CommonModule,
    SharedModule,
    PrivacyRoutingModule,
    MarkdownModule.forChild(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrivacyModule {}
