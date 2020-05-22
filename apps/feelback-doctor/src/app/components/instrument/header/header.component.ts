import { Component, OnInit, Input } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterEvent,
  NavigationEnd,
} from '@angular/router';
import { Patient } from '../../../models/Patient';
import { Instrument } from '../../../models/Instrument';
import { PatientService } from '../../../services/patient.service';
import { InstrumentService } from '../../../services/instrument.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'feelback-doctor-instrument-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public commonService: CommonService) {}

  @Input() patient: Patient;

  ngOnInit(): void {}
}
