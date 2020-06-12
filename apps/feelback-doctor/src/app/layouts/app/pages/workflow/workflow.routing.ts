import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WorkflowPage } from './workflow.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'workflow'
  },
  {
    path: 'workflow',
    component: WorkflowPage,
    loadChildren: () => import(`./pages/workflow.pages.module`).then(m => m.WorkflowPagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowRouting {}
