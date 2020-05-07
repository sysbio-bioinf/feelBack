import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { StartRoutingModule } from './start-routing.module';
import { StartPage } from './start.page';

@NgModule({
  declarations: [StartPage],
  imports: [CommonModule, SharedModule, StartRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartModule {}
