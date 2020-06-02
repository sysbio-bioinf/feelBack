import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '././../../../../material.module';
import { LoginPage } from './login.page';
import { LoginRouting } from './login.routing';

@NgModule({
  declarations: [LoginPage],
  imports: [MaterialModule, CommonModule, LoginRouting],
})
export class LoginModule {}
