import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientService } from 'apps/feelback-doctor/src/app/services/patient.service';
import { Patient } from 'apps/feelback-doctor/src/app/models/patient.model';

@Component({
  selector: 'feelback-doctor-patients-page',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  constructor(private patientService: PatientService) {}

  public patients$: Observable<Patient[]>;

  ngOnInit(): void {
    this.patients$ = this.patientService.getPatients();
  }
}
