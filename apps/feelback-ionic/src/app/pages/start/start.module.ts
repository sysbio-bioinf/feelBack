import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { StartPageRoutingModule } from './start-routing.module';
import { StartPage } from './start.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [StartPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartPageModule {}
