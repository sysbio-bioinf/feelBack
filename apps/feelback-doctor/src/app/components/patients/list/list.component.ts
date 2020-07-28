import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';
import { Organization } from '../../../graphql/generated/feelback.graphql';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'feelback-doctor-patient-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public dataSource: MatTableDataSource<Patient>;
  public displayedColumns: string[] = [
    'pseudonym',
    'organization',
    // 'consultation',
    // 'rating',
    // 'instruments',
    // 'screenings',
  ];
  @Input() organizations: Organization[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private patients: Patient[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
  ) {}

  ngOnInit(): void {
    for(const organization of this.organizations){
      for(const patient of organization['node']['persons']['edges']){
        this.patients.push({
          id: patient['node']['id'],
          organization: organization['node']['name'],
          pseudonym: patient['node']['pseudonym']
        });
      }
    }
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
