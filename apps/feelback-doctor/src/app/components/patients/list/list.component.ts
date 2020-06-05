import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../../../models/patient';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'feelback-doctor-patient-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
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
    private route: ActivatedRoute,
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
    this.router.navigate([patient.id], { relativeTo: this.route });
  }
}
