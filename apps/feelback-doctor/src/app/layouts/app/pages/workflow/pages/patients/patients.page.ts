import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientService } from '../../../../../../services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../../../../app/services/common.service';
import {Organization} from '../../../../../../models/organization.model';
import { Patient } from '../../../../../../../../src/app/models/patient.model';

@Component({
  selector: 'feelback-doctor-patients-page',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
  ) {}

  public organizations$: Observable<Organization[]>;

  ngOnInit(): void {
    this.organizations$ = this.patientService.getOrganizations();
  }

  public selectPatient(patient: Patient): void {
    this.router.navigate([patient.id], { relativeTo: this.route });
  }
}
