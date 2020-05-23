import { Component, OnInit, Input } from '@angular/core';
import { Screening } from '../../../models/Screening';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'feelback-doctor-screening-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent implements OnInit {
  constructor() {}

  @Input() screening: Screening;

  ngOnInit(): void {}

  public printScreening() {
    console.log('print screening');
  }

  public downloadScreening(screening: Screening) {
    const blob = new Blob([JSON.stringify(screening, null, 3)], {
      type: 'text/json',
    });
    fileSaver.saveAs(
      blob,
      'jsonExport_' + new Date().toLocaleDateString('de') + '.json',
    );
  }

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
