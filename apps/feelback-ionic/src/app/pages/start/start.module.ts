import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/modules/components.module';
import { StartPageRoutingModule } from './start-routing.module';
import { StartPage } from './start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartPageRoutingModule,
    ComponentsModule,
    TranslateModule.forChild(),
  ],
  declarations: [StartPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartPageModule {}
