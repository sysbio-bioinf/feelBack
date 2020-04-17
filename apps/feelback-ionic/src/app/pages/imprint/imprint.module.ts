import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { ComponentsModule } from 'src/app/components/components.module';
import { ImprintPageRoutingModule } from './imprint-routing.module';
import { ImprintPage } from './imprint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImprintPageRoutingModule,
    ComponentsModule,
    TranslateModule.forChild(),
    MarkdownModule.forChild(),
  ],
  declarations: [ImprintPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImprintPageModule {}
