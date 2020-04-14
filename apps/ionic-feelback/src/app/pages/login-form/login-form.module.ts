import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { LoginFormPageRoutingModule } from './login-form-routing.module';
import { LoginFormPage } from './login-form.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LoginFormPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [LoginFormPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginFormPageModule {}
