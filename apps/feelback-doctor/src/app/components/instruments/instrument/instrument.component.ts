import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ScreeningService } from '../../../services/screening.service';
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Instrument,
  Screening,
} from '../../../graphql/generated/feelback.graphql';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DateHelper } from '@feelback-app/util/helper';

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
  public today = new Date();
  public startDate: Date;
  public endDate: Date;

  ngOnInit(): void {
    setTimeout(() => this.selectDaterange(this.selectedDaterange), 250);
  }

  public selectDaterange(daterange: string) {
    this.selectedDaterange = daterange;
    const currentMonth = this.today.getMonth();
    const currentYear = this.today.getFullYear();
    switch (daterange) {
      case 'last-year': {
        this.startDate = DateHelper.createUtcDate(
          new Date(currentYear - 1, 0, 1),
        );
        this.endDate = DateHelper.createUtcDate(
          new Date(currentYear - 1, 12, 0, 23, 59, 59),
        );
        break;
      }
      case 'current-year': {
        this.startDate = DateHelper.createUtcDate(new Date(currentYear, 0, 1));
        this.endDate = DateHelper.createUtcDate(
          new Date(currentYear, 12, 0, 23, 59, 59),
        );
        break;
      }
      case 'current-month': {
        this.startDate = DateHelper.createUtcDate(
          new Date(currentYear, currentMonth, 1),
        );
        this.endDate = DateHelper.createUtcDate(
          new Date(currentYear, currentMonth + 1, 0, 23, 59, 59),
        );
        break;
      }
      case 'last-month': {
        this.startDate = DateHelper.createUtcDate(
          new Date(currentYear, currentMonth - 1, 1),
        );
        this.endDate = DateHelper.createUtcDate(
          new Date(currentYear, currentMonth, 0, 23, 59, 59),
        );
        break;
      }
      case 'custom': {
        this.startDate = DateHelper.createUtcDate(this.startDateForm.value);
        this.endDate = this.endDateForm.value;
        this.endDate.setHours(23);
        this.endDate.setMinutes(59);
        this.endDate.setSeconds(59);
        this.endDate = DateHelper.createUtcDate(this.endDate);
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
