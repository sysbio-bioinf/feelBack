import { NgModule } from '@angular/core';
import { LoginModule } from './login/login.module';
import { ErrorModule } from './error/error.module';

@NgModule({
  declarations: [],
  imports: [LoginModule, ErrorModule],
})
export class CommonPagesModule {}
