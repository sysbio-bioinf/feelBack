import { Component, OnInit } from '@angular/core';
import { GetInstrumentsGQL } from '../../graphql/generated/feelback.graphql';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient.service';
import { InstrumentService } from '../../services/instrument.service';
import { Instrument } from '../../models/Instrument';

@Component({
  selector: 'feelback-doctor-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {
  constructor(
    private patientService: PatientService,
    private instrumentService: InstrumentService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.patient.id = params.get('patient');
    });
  }

  public patient: Patient = new Patient();
  public links = [];

  ngOnInit(): void {
    this.patientService.getPatientById(this.patient.id).subscribe((patient) => (this.patient = patient));
    this.instrumentService
      .getInstruments()
      .subscribe((instruments) => this.transformInstrumentsToLinks(instruments)
        );
  }

  private transformInstrumentsToLinks(instruments: Instrument[]) {
    for (const [index, instrument] of instruments.entries()) {
      this.links.push({
        label: instrument.name,
        link: './instruments/' + instrument.id,
        index: index,
      });
    }
  }
}
