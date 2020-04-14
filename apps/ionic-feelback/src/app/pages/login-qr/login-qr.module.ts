import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { LoginQrPageRoutingModule } from './login-qr-routing.module';
import { LoginQrPage } from './login-qr.page';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LoginQrPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [LoginQrPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginQrPageModule {}
