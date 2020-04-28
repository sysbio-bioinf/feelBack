import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/Patient';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public panelOpenState = false;
  public options = [
    {value: 'over'},
    {value: 'under'}
  ];

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
      '/patient-details/' + patient.name + '/Distress Thermometer',
    );
  }
}
