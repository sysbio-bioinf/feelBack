import { NgModule } from '@angular/core';
import { CommonPagesModule } from './pages/common.pages.module';
import { CommonLayoutRouting } from './common.layout.routing';
import { CommonLayout } from './common.layout';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [CommonLayout],
  imports: [MaterialModule, CommonModule, CommonPagesModule, CommonLayoutRouting],
})
export class CommonLayoutModule {}
