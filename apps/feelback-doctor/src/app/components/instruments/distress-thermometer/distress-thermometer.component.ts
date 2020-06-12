import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ScreeningService } from '../../../services/screening.service';
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Instrument } from '../../../graphql/generated/feelback.graphql';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'feelback-doctor-distress-thermometer',
  templateUrl: './distress-thermometer.component.html',
  styleUrls: ['./distress-thermometer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DistressThermometerComponent implements OnInit {
  constructor(
    private screeningService: ScreeningService,
    public commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  @Input() instrument: Instrument;
  public screenings$: Observable<any>;
  public selectedDaterange = 'current-year';
  public startDate = new FormControl();
  public endDate = new FormControl();
  public today = new Date();

  ngOnInit(): void {
    setTimeout(() => this.selectDaterange(this.selectedDaterange), 250);
  }

  public selectDaterange(daterange: string) {
    this.selectedDaterange = daterange;
    let startDate: Date, endDate: Date;
    const currentMonth = this.today.getMonth();
    const currentYear = this.today.getFullYear();
    switch (daterange) {
      case 'last-year': {
        startDate = new Date(currentYear-1, 0, 1);
        endDate = new Date(currentYear-1, 12, 0, 23, 59, 59);
        break;
      }
      case 'current-year': {
        startDate = new Date(currentYear, 0, 1);
        endDate = new Date(currentYear, 12, 0, 23, 59, 59);
        break;
      }
      case 'current-month': {
        startDate = new Date(currentYear, currentMonth, 1);
        endDate = new Date(currentYear, currentMonth+1, 0, 23, 59, 59);
        break;
      }
      case 'last-month': {
        startDate = new Date(currentYear, currentMonth - 1, 1);
        endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59);
        break;
      }
      case 'custom': {
        startDate = this.startDate.value;
        endDate = this.endDate.value;
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
        break;
      }
    }
    console.log("startDate: " + startDate);
    console.log("endDate: " + endDate);
    this.screenings$ = this.screeningService.getScreenings(
      '2b3f4524-773d-4a2a-a576-ace6cfc4d7f3',
      '53f2a7c3-9c37-4a52-9194-8a3186af6f57',
      startDate,
      endDate,
    );
  }

  public selectScreening(screening): void {
    this.router.navigate([screening.screeningId], {
      relativeTo: this.route,
    });
  }
}
