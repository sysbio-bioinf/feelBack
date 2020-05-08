import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../../models/Patient';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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
    'screenings',
  ];
  public patients$: Observable<Observable<Patient[]>>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private patientService: PatientService,
    private router: Router,
    public commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.patients$ = this.patientService.getPatients().pipe(
      map((data) => {
        this.dataSource = new MatTableDataSource<Patient>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return of(data);
      }),
    );
  }

  public applyFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  public selectPatient(patient: Patient) {
    this.router.navigateByUrl('/patients/' + patient.id);
  }
}
