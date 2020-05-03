import { Component, OnInit } from '@angular/core';
import { InstrumentService } from '../../services/instrument.service';
import { ActivatedRoute } from '@angular/router';
import { Instrument } from '../../models/Instrument';

@Component({
  selector: 'feelback-doctor-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
})
export class InstrumentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private instrumentService: InstrumentService,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.instrument.id = params.get('instrument');
      this.instrumentService
      .getInstrumentById(this.instrument.id)
      .subscribe((instrument) => (this.instrument = instrument));
    });
  }

  public instrument: Instrument = new Instrument();

  ngOnInit(): void {
    
  }
}
