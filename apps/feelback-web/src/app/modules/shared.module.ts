import { NgModule } from '@angular/core';
import { ComponentsModule } from './components.module';
import { UIModule } from './ui.module';

@NgModule({
  imports: [UIModule, ComponentsModule],
  exports: [UIModule, ComponentsModule],
})
export class SharedModule {}
