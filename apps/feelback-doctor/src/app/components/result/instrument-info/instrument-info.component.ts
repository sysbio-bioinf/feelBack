import { Component, OnInit, Input } from '@angular/core';
import { Instrument } from '../../../graphql/generated/feelback.graphql';

@Component({
  selector: 'feelback-doctor-instrument-info',
  templateUrl: './instrument-info.component.html',
  styleUrls: ['./instrument-info.component.scss']
})
export class InstrumentInfoComponent implements OnInit {

  constructor() { }

  @Input() instrument: Instrument;

  ngOnInit(): void {
  }

}
