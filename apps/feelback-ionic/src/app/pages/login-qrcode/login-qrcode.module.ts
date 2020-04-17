import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginQrcodePageRoutingModule } from './login-qrcode-routing.module';

import { LoginQrcodePage } from './login-qrcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginQrcodePageRoutingModule
  ],
  declarations: [LoginQrcodePage]
})
export class LoginQrcodePageModule {}
