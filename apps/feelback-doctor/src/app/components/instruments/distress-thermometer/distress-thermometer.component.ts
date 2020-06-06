import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ChartDataPoint } from '../../../models/chart-data-point';
import { ScreeningService } from '../../../services/screening.service';
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Instrument } from '../../../graphql/generated/feelback.graphql';
import { Observable } from 'rxjs';

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

  ngOnInit(): void {
    this.screenings$ = this.screeningService.getScreenings("2b3f4524-773d-4a2a-a576-ace6cfc4d7f3", "53f2a7c3-9c37-4a52-9194-8a3186af6f57");
  }

  public selectScreening(screening): void {
    this.router.navigate([screening.screeningId], {
      relativeTo: this.route,
    });
  }
}
