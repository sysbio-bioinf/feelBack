import { Component, OnInit } from '@angular/core';
import { InstrumentService } from '../../services/instrument.service';
import { ActivatedRoute } from '@angular/router';
import { Instrument } from '../../models/Instrument';
import { Patient } from '../../models/Patient';

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
    console.log(history.state.data);
    this.route.paramMap.subscribe((params) => {
      this.instrumentService
        .getInstrumentById(params.get('instrument'))
        .subscribe((instrument) => (this.instrument = instrument));
    });
  }

  public patient: Patient = new Patient();
  public instrument: Instrument = new Instrument();

  ngOnInit(): void {}
}
