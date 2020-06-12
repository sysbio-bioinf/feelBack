import { NgModule } from '@angular/core';
import { ImprintModule } from './imprint/imprint.module';
import { WorkflowModule } from './workflow/workflow.module';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [],
  imports: [ImprintModule, ProfileModule, SettingsModule, WorkflowModule],
})
export class AppPagesModule {}
