import { Component, OnInit, Input } from '@angular/core';
import { ScreeningService } from '../../services/screening.service';
import { Observable } from 'rxjs';
import { Screening } from '../../models/Screening';
import { Router, ActivatedRoute } from '@angular/router';
import * as fileSaver from 'file-saver';
import { CommonService } from '../../services/common.service';
import { Instrument } from '../../graphql/generated/feelback.graphql';

@Component({
  selector: 'feelback-doctor-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss'],
})
export class ScreeningComponent implements OnInit {
  constructor(
    private screeningService: ScreeningService,
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
  ) {}

  @Input() instrument: Instrument;
  public screening$: Observable<Screening>;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.screening$ = this.screeningService.getScreening(params['screening']);
    });
  }

  public closeScreening() {
    this.router.navigate([]);
  }

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
