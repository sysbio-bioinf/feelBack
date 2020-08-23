import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { EvaluationResult } from '../../../models/evaluation-result.model';

@Component({
  selector: 'feelback-doctor-screening-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent implements OnInit {
  constructor(public commonService: CommonService) {}

  @Input() createdAt: Date;
  @Input() resolveComment: string;
  @Input() evaluationResult: EvaluationResult;

  ngOnInit(): void {}
}
