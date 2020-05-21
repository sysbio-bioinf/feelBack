import { Component, OnInit } from '@angular/core';
import { Screening } from '../../models/Screening';
import { Observable } from 'rxjs';
import { ScreeningService } from '../../services/screening.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { InstrumentService } from '../../services/instrument.service';
import { Instrument } from '../../graphql/generated/feelback.graphql';

@Component({
  selector: 'feelback-doctor-screening',
  templateUrl: './screening.page.html',
  styleUrls: ['./screening.page.scss']
})
export class ScreeningPage implements OnInit {

  constructor(
    private screeningService: ScreeningService,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private instrumentService: InstrumentService,
  ) {}

  public screening$: Observable<Screening>;
  public instrument$: Observable<Instrument>;
  public instrumentId: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.screening$ = this.screeningService.getScreening(
        params.get('screening'),
      );
    });
    this.route.parent.paramMap.subscribe((params) => {
      this.instrumentId = params.get('instrument');

      this.instrument$ = this.instrumentService.getInstrumentById(
        this.instrumentId,
      );
    });
  }

}
