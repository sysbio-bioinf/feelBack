import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../../components/components.module';
import { MaterialModule } from '../../../../material.module';
import { SettingsRouting } from './settings.routing';
import { SettingsPage } from './settings.page';

@NgModule({
  declarations: [SettingsPage],
  imports: [CommonModule, RouterModule, ComponentsModule, MaterialModule, SettingsRouting],
})
export class SettingsModule {}