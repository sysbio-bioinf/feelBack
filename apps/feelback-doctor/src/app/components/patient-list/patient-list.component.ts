import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../../models/Patient';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'feelback-doctor-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  public dataSource: MatTableDataSource<Patient>;
  public displayedColumns: string[] = [
    'name',
    'organization',
    'consultation',
    'rating',
    'instruments',
    'screenings'
  ];
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
  }

  public applyFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  public selectPatient(patient: Patient) {
    this.router.navigateByUrl(
      '/patient-details/' + patient.id + '/a1cf3754-9aab-4530-9818-735bf63e53c8',
    );
  }
}
