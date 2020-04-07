import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../features/shared/shared.module';
import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start.component';

@NgModule({
  imports: [SharedModule, StartRoutingModule, TranslateModule.forChild()],
  declarations: [StartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartPageModule {}
