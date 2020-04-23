import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';

const components = [FooterComponent, HeaderComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgPipesModule,
  ],
  exports: [...components],
})
export class ComponentsModule {}
