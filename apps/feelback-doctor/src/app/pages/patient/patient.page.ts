import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'feelback-doctor-patients-page',
  templateUrl: './patient.page.html',
  styleUrls: ['./patient.page.scss'],
})
export class PatientPage implements OnInit {
  constructor(private patientService: PatientService) {}

  public patients$: Observable<Patient[]>;

  ngOnInit(): void {
    this.patients$ = this.patientService.getPatients();
  }
}
