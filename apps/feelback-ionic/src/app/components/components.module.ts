import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

const components = [];

@NgModule({
  declarations: [...components],
  imports: [IonicModule, CommonModule],
  exports: [...components],
})
export class ComponentsModule {}
