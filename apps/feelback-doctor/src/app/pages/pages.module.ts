import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListPage } from './patient-list/patient-list.page';
import { PatientDetailsPage } from './patient-details/patient-details.page';
import { LoginPage } from './login/login.page';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [PatientListPage, PatientDetailsPage, LoginPage],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    RouterModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class PagesModule {}
