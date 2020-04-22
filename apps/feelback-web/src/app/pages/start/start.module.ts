import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartPage } from './start.page';

@NgModule({
  declarations: [StartPage],
  imports: [CommonModule, StartRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StartModule {}
