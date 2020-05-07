import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared.module';
import { LoginQrcodePageRoutingModule } from './login-qrcode-routing.module';
import { LoginQrcodePage } from './login-qrcode.page';

@NgModule({
  imports: [SharedModule, IonicModule, LoginQrcodePageRoutingModule],
  declarations: [LoginQrcodePage],
})
export class LoginQrcodePageModule {}
