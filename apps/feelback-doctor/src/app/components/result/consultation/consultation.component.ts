import { Component, OnInit, Input } from '@angular/core';
import { Screening } from '../../../models/Screening';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'feelback-doctor-screening-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent implements OnInit {
  constructor(public commonService: CommonService) {}

  @Input() screening: Screening;

  ngOnInit(): void {}

  public getConsultation(screening: Screening) {
    if (screening.result['DT02'] === 'true') {
      return 'wanted';
    } else if (screening.result['DT01'] >= 5) {
      return 'necessary';
    } else {
      return 'no';
    }
  }
}
