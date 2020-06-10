import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../modules/shared.module';
import { StartPageRoutingModule } from './start-routing.module';
import { StartPage } from './start.page';

@NgModule({
  imports: [SharedModule, IonicModule, StartPageRoutingModule],
  declarations: [StartPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartPageModule {}
