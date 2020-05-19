import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  @Input() patients: Patient[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    public commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Patient>(this.patients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  public selectPatient(patient: Patient) {
    this.router.navigate(['patients', patient.id]);
  }
}
