import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientService } from '../../../../../../services/patient.service';
import { Patient } from '../../../../../../models/patient.model';

@Component({
  selector: 'feelback-doctor-patients-page',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  constructor(private patientService: PatientService) {}

  public patients$: Observable<Patient[]>;

  ngOnInit(): void {
    this.patients$ = this.patientService.getPatientsFromServer();
  }
}
