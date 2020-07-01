import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { DividerComponent } from '../components/divider/divider.component';
import { LogoComponent } from '../components/logo/logo.component';
import { RouterModule } from '@angular/router';

const components = [
  FooterComponent,
  HeaderComponent,
  DividerComponent,
  LogoComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgPipesModule,
    RouterModule,
  ],
  exports: [...components],
})
export class ComponentsModule {}
