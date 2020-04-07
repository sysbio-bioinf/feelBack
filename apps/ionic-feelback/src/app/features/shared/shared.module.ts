import { NgModule } from '@angular/core';

// xplat
import { UIModule } from '@cancerlog/ionic';

@NgModule({
  imports: [UIModule],
  exports: [UIModule],
})
export class SharedModule {}
