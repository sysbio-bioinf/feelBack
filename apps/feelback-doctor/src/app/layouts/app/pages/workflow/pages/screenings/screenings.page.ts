import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from '../../../../../../services/instrument.service';
import { Patient } from '../../../../../../models/patient.model';
import { Instrument } from '../../../../../../graphql/generated/feelback.graphql';
import { FormControl } from '@angular/forms';
import * as dayjs from 'dayjs';
import { DateHelper } from '@feelback-app/util/helper';
import { ScreeningService } from '../../../../../../services/screening.service';
import { CommonService } from '../../../../../../services/common.service';

@Component({
  selector: 'feelback-doctor-screenings',
  templateUrl: './screenings.page.html',
  styleUrls: ['./screenings.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScreeningsPage implements OnInit {
  constructor(
    public commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private instrumentService: InstrumentService,
    private screeningService: ScreeningService,
  ) {}

  private patientId: string;
  public patient$: Observable<Patient>;
  private instrumentId: string;
  public instrument$: Observable<Instrument>;
  public screenings$: Observable<any>;
  public selectedDaterange = 'current-year';
  public startDateForm = new FormControl();
  public endDateForm = new FormControl();
  public today = dayjs();
  public startDate: Date;
  public endDate: Date;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('patient');
      this.instrumentId = params.get('instrument');
      if (!this.instrumentService.checkIfInstrumentExists(this.instrumentId)) {
        this.navigateToInstrumentErrorPage();
      } else {
        this.instrument$ = this.instrumentService.getInstrument(
          this.instrumentId,
        );
      }
    });
    setTimeout(() => this.selectDaterange(this.selectedDaterange), 300);
  }

  private navigateToInstrumentErrorPage() {
    this.router.navigate(['error'], {
      queryParams: {},
      queryParamsHandling: 'merge',
      state: {
        code: 404,
        entity: 'instrument',
        callbackUrl: this.buildCallbackUrl(),
      },
    });
  }

  public selectDaterange(daterange: string) {
    this.selectedDaterange = daterange;
    switch (daterange) {
      case 'last-year': {
        this.startDate = DateHelper.createUtcDate(
          this.today.subtract(1, 'year').startOf('year').toDate(),
        );
        this.endDate = DateHelper.createUtcDate(
          this.today.subtract(1, 'year').endOf('year').toDate(),
        );
        break;
      }
      case 'current-year': {
        this.startDate = DateHelper.createUtcDate(
          this.today.startOf('year').toDate(),
        );
        this.endDate = DateHelper.createUtcDate(
          this.today.endOf('year').toDate(),
        );
        break;
      }
      case 'current-month': {
        this.startDate = DateHelper.createUtcDate(
          this.today.startOf('month').toDate(),
        );
        this.endDate = DateHelper.createUtcDate(
          this.today.endOf('month').toDate(),
        );
        break;
      }
      case 'last-month': {
        this.startDate = DateHelper.createUtcDate(
          this.today.subtract(1, 'month').startOf('month').toDate(),
        );
        this.endDate = DateHelper.createUtcDate(
          this.today.subtract(1, 'month').endOf('month').toDate(),
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
    this.screenings$ = this.screeningService.getScreenings(
      this.patientId,
      this.instrumentId,
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

  private buildCallbackUrl() {
    const url = this.router.url;
    const url_mod = url.substring(0, url.lastIndexOf('/'));
    return url_mod.substring(0, url_mod.lastIndexOf('/'));
  }
}
