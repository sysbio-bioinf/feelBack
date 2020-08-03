import { Component, OnInit, Input } from '@angular/core';
import { Instrument } from '../../../graphql/generated/feelback.graphql';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'feelback-doctor-instrument-info',
  templateUrl: './instrument-info.component.html',
  styleUrls: ['./instrument-info.component.scss'],
})
export class InstrumentInfoComponent implements OnInit {
  constructor(public commonService: CommonService) {}

  @Input() instrument: Instrument;
  @Input() hoverable = false;
  @Input() image = true;
  ngOnInit(): void {}
}
