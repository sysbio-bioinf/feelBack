import { Component, OnInit } from '@angular/core';
import { InstrumentService } from '../../services/instrument.service';
import { Observable } from 'rxjs';
import { Instrument } from '../../graphql/generated/feelback.graphql';
import { Patient } from '../../models/Patient';

@Component({
  selector: 'feelback-doctor-instruments',
  templateUrl: './instruments.page.html',
  styleUrls: ['./instruments.page.scss'],
})
export class InstrumentsPage implements OnInit {
  constructor(private instrumentService: InstrumentService) {}

  public patientId: string;
  public patient$: Observable<Patient>;
  public instruments$: Observable<Instrument[]>;
  public instruments: Instrument[];

  ngOnInit(): void {
    this.instruments$ = this.instrumentService.getInstruments();
  }
}
