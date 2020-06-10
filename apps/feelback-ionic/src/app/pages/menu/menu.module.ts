import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../modules/shared.module';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';

@NgModule({
  imports: [SharedModule, IonicModule, MenuPageRoutingModule],
  declarations: [MenuPage],
})
export class MenuPageModule {}
