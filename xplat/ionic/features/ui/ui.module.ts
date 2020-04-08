import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgPipesModule } from 'ngx-pipes';
import { UIModule as UIWebModule } from '@cancerlog/web';
import {
  HeaderComponent,
  OrganizationCardComponent,
  InstrumentCardComponent,
} from './components';

const customComponents = [
  HeaderComponent,
  OrganizationCardComponent,
  InstrumentCardComponent,
];

@NgModule({
  imports: [UIWebModule, IonicModule, NgPipesModule],
  declarations: [...customComponents],
  exports: [UIWebModule, IonicModule, ...customComponents],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UIModule {}
