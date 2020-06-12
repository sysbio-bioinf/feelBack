import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../../components/components.module';
import { MaterialModule } from '../../../../material.module';
import { ProfilePage } from './profile.page';
import { ProfileRouting } from './profile.routing';

@NgModule({
  declarations: [ProfilePage],
  imports: [CommonModule, RouterModule, ComponentsModule, MaterialModule, ProfileRouting],
})
export class ProfileModule {}