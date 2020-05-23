import { NgModule } from '@angular/core';
import { GraphQLModule } from '../modules/graphql.module';
import { LoginModule } from './login/login.module';
import { ErrorModule } from './error/error.module';
import { PatientsModule } from './patients/patients.module';
import { ScreeningsModule } from './screenings/screenings.module';
import { ResultModule } from './result/result.module';
import { InstrumentsModule } from './instruments/instruments.module';

@NgModule({
  declarations: [],
  imports: [LoginModule, PatientsModule, InstrumentsModule, ScreeningsModule, ResultModule, ErrorModule],
  providers: [GraphQLModule],
})
export class PagesModule {}
