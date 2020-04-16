import { NgModule } from '@angular/core';

// xplat
import { UIModule } from '@cancerlog/ionic';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [UIModule, ComponentsModule],
  exports: [UIModule, ComponentsModule],
})
export class SharedModule {}
