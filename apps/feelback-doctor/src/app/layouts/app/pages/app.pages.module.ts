import { NgModule } from '@angular/core';
import { PatientsModule } from './patients/patients.module';
import { InstrumentsModule } from './instruments/instruments.module';
import { ScreeningsModule } from './screenings/screenings.module';
import { ResultModule } from './result/result.module';
import { ImprintModule } from './imprint/imprint.module';

@NgModule({
  declarations: [],
  imports: [PatientsModule, InstrumentsModule, ScreeningsModule, ResultModule, ImprintModule],
})
export class AppPagesModule {}
