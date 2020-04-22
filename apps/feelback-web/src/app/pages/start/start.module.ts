import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartPage } from './start.page';

@NgModule({
  declarations: [StartPage],
  imports: [CommonModule, StartRoutingModule],
})
export class StartModule {}
