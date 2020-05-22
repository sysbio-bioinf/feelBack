import { Component, OnInit } from '@angular/core';
import { InstrumentService } from '../../../services/instrument.service';
import { Instrument } from '../../../models/Instrument';
import { Observable } from 'rxjs';

@Component({
  selector: 'feelback-doctor-choose-instrument',
  templateUrl: './choose-instrument.component.html',
  styleUrls: ['./choose-instrument.component.scss'],
})
export class ChooseInstrumentComponent implements OnInit {
  constructor(private instrumentService: InstrumentService) {}

  public instruments$: Observable<Instrument[]>;
  public instruments: Instrument[];

  ngOnInit(): void {
      this.instruments$ = this.instrumentService.getInstruments();
  }


}
