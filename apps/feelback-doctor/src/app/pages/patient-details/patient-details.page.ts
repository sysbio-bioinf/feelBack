import { Component, OnInit } from '@angular/core';
import { GetInstrumentsGQL } from '../../graphql/generated/feelback.graphql';

@Component({
  selector: 'feelback-doctor-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
})
export class PatientDetailsPage implements OnInit {
  constructor(private instrumentService: GetInstrumentsGQL) {}

  ngOnInit(): void {
    this.instrumentService.fetch().subscribe(instrument => this.instrument = instrument);
  }

  public instrument: any;
}
