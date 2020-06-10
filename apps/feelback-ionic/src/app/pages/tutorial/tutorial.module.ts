import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../modules/shared.module';
import { TutorialPageRoutingModule } from './tutorial-routing.module';
import { TutorialPage } from './tutorial.page';

@NgModule({
  imports: [SharedModule, IonicModule, TutorialPageRoutingModule],
  declarations: [TutorialPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TutorialPageModule {}
