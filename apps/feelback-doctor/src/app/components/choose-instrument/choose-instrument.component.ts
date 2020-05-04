import { Component, OnInit } from '@angular/core';
import { InstrumentService } from '../../services/instrument.service';
import { Instrument } from '../../models/Instrument';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'feelback-doctor-choose-instrument',
  templateUrl: './choose-instrument.component.html',
  styleUrls: ['./choose-instrument.component.scss'],
})
export class ChooseInstrumentComponent implements OnInit {
  constructor(private instrumentService: InstrumentService, private router: Router, private route: ActivatedRoute) {}

  public instruments: Instrument[];

  ngOnInit(): void {
    this.instrumentService
      .getInstruments()
      .subscribe((instruments) => (this.instruments = instruments));
  }

}
