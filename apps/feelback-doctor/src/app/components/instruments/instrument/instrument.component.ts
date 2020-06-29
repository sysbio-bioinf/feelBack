import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ScreeningService } from '../../../services/screening.service';
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Instrument,
} from '../../../graphql/generated/feelback.graphql';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DateHelper } from '@feelback-app/util/helper';
import * as dayjs from 'dayjs';

@Component({
  selector: 'feelback-doctor-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InstrumentComponent implements OnInit {
  constructor(
    private screeningService: ScreeningService,
    public commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  @Input() instrument: Instrument;
  public screenings$: Observable<any>;
  public selectedDaterange = 'current-year';
  public startDateForm = new FormControl();
  public endDateForm = new FormControl();
  public today = dayjs();
  public startDate: Date;
  public endDate: Date;

  ngOnInit(): void {
    setTimeout(() => this.selectDaterange(this.selectedDaterange), 250);
  }

  public selectDaterange(daterange: string) {
    this.selectedDaterange = daterange;
    switch (daterange) {
      case 'last-year': {
        this.startDate = DateHelper.createUtcDate(this.today.subtract(1, 'year').startOf('year').toDate());
        this.endDate = DateHelper.createUtcDate(
          this.today.subtract(1, 'year').endOf('year').toDate()
        );
        break;
      }
      case 'current-year': {
        this.startDate = DateHelper.createUtcDate(
          this.today.startOf('year').toDate()
        );
        this.endDate = DateHelper.createUtcDate(
          this.today.endOf('year').toDate()
        );
        break;
      }
      case 'current-month': {
        this.startDate = DateHelper.createUtcDate(
          this.today.startOf('month').toDate()
        );
        this.endDate = DateHelper.createUtcDate(
          this.today.endOf('month').toDate()
        );
        break;
      }
      case 'last-month': {
        this.startDate = DateHelper.createUtcDate(
          this.today.subtract(1, 'month').startOf('month').toDate()
        );
        this.endDate = DateHelper.createUtcDate(
          this.today.subtract(1, 'month').endOf('month').toDate()
        );
        break;
      }
      case 'custom': {
        this.startDate = DateHelper.createUtcDate(this.startDateForm.value);
        console.log(this.endDateForm.value);
        const endDate = dayjs(this.endDateForm.value).endOf('day');
        this.endDate = DateHelper.createUtcDate(endDate.toDate());
        break;
      }
    }
    // TODO replace hard coded
    this.screenings$ = this.screeningService.getScreenings(
      '2b3f4524-773d-4a2a-a576-ace6cfc4d7f3',
      '53f2a7c3-9c37-4a52-9194-8a3186af6f57',
      this.startDate,
      this.endDate,
      daterange,
    );
  }

  public selectScreening(screening): void {
    this.router.navigate([screening.screeningId], {
      relativeTo: this.route,
    });
  }
}
