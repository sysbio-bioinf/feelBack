import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientService } from '../../../../../../services/patient.service';
import { Organization } from '../../../../../../graphql/generated/feelback.graphql';

@Component({
  selector: 'feelback-doctor-patients-page',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  constructor(private patientService: PatientService) {}

  public organizations$: Observable<Organization[]>;

  ngOnInit(): void {
    this.organizations$ = this.patientService.getOrganizations();
  }
}
