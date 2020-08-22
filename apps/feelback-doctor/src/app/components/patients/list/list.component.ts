import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  ];
  @Input() organizations: Organization[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
  ) {}

  ngOnInit(): void {
  }

  public applyFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  public selectPatient(patient: Patient) {
    this.router.navigate([patient['node'].id], { relativeTo: this.route });
  }
}
