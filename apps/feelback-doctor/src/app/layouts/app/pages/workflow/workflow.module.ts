import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../../components/components.module';
import { MaterialModule } from '../../../../material.module';
import { WorkflowPage } from './workflow.page';
import { WorkflowRouting } from './workflow.routing';

@NgModule({
  declarations: [WorkflowPage],
  imports: [CommonModule, RouterModule, ComponentsModule, MaterialModule, WorkflowRouting],
})
export class WorkflowModule {}
