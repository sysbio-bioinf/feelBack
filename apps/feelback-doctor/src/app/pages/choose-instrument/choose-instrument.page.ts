import { Component, OnInit } from '@angular/core';
import { InstrumentService } from '../../services/instrument.service';
import { Observable } from 'rxjs';
import { Instrument } from '../../graphql/generated/feelback.graphql';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../../models/Patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'feelback-doctor-choose-instrument',
  templateUrl: './choose-instrument.page.html',
  styleUrls: ['./choose-instrument.page.scss'],
})
export class ChooseInstrumentPage implements OnInit {
  constructor(private instrumentService: InstrumentService) {}

  public patientId: string;
  public patient$: Observable<Patient>;
  public instruments$: Observable<Instrument[]>;
  public instruments: Instrument[];

  ngOnInit(): void {
    this.instruments$ = this.instrumentService.getInstruments();
  }
}
