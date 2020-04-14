import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/features/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [SettingsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingsPageModule {}
