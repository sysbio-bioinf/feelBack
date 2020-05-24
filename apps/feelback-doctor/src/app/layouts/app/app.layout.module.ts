import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppLayout } from './app.layout';
import { MaterialModule } from '../../modules/material.module';
import { ComponentsModule } from '../../components/components.module';
import { AppPagesModule } from './pages/app.pages.module';
import { GraphQLModule } from '../../modules/graphql.module';

@NgModule({
  declarations: [AppLayout],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ComponentsModule,
    AppPagesModule,
  ],
})
export class AppLayoutModule {}
