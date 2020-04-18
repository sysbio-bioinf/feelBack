import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared.module';
import { MenuPageRoutingModule } from './menu-routing.module';
import { MenuPage } from './menu.page';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    MenuPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [MenuPage],
})
export class MenuPageModule {}
