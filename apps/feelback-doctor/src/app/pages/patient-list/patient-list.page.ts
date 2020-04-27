import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/Patient';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'feelback-doctor-patient-list',
  templateUrl: './patient-list.page.html',
  styleUrls: ['./patient-list.page.scss'],
})
export class PatientListPage implements OnInit {
  public dataSource: MatTableDataSource<Patient>;
  public displayedColumns: string[] = [
    'name',
    'organization',
    'consultation',
    'rating',
  ];
  public selection: SelectionModel<Patient>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.patientService
      .getPatients()
      .subscribe(
        (patients) =>
          (this.dataSource = new MatTableDataSource<Patient>(patients)),
      );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selection = new SelectionModel<Patient>(false, []);
  }

  public applyFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  public selectPatient(patient: Patient) {
    this.router.navigateByUrl(
      '/patient-details/' + patient.name + '/Distress Thermometer',
    );
  }

}
