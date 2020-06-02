import { Component, OnInit, Input } from '@angular/core';
import { Screening } from '../../../models/Screening';
import { CommonService } from '../../../services/common.service';
import { Parser } from 'expr-eval';

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
    const evaluationResult = screening.evaluationResult[1];
    if (Parser.evaluate(evaluationResult.condition, screening.payload)) {
      return evaluationResult.then;
    } else {
      return evaluationResult.else;
    }
  }
}
