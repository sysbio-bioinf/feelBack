import { Component, OnInit } from '@angular/core';
import { GetInstrumentsGQL } from '../../graphql/generated/feelback.graphql';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'feelback-doctor-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {
  constructor(
    private instrumentService: GetInstrumentsGQL,
    private patientService: PatientService,
    private route: ActivatedRoute,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.patient.id = params.get('patient');
    });
  }

  ngOnInit(): void {
    this.instrumentService
      .fetch()
      .subscribe((instrument) => (this.instrument = instrument));
    this.patientService
      .getPatientById(this.patient.id)
      .subscribe((patient) => (this.patient = patient));
  }

  public instrument: any;
  public patient: Patient = new Patient();
}
