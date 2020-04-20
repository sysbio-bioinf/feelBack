import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared.module';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    ProfilePageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
