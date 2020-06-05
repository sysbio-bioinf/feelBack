import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { Screening } from '../../../graphql/generated/feelback.graphql';

@Component({
  selector: 'feelback-doctor-screening-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent implements OnInit {
  constructor(public commonService: CommonService) {}

  @Input() screening: Screening;

  ngOnInit(): void {}

}
