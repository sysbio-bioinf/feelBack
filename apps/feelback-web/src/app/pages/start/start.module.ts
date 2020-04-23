import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartPage } from './start.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../modules/shared.module';

@NgModule({
  declarations: [StartPage],
  imports: [
    CommonModule,
    SharedModule,
    StartRoutingModule,
    TranslateModule.forChild(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartModule {}
