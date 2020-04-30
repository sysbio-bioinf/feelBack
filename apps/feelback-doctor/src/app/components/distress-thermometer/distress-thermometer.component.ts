import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartDataPoint } from '../../models/ChartDataPoint';
import { ChartSeries } from '../../models/ChartSeries';
import { ScreeningService } from '../../services/screening.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'feelback-doctor-distress-thermometer',
  templateUrl: './distress-thermometer.component.html',
  styleUrls: ['./distress-thermometer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DistressThermometerComponent implements OnInit {

  constructor(private screeningService: ScreeningService, public commonService: CommonService) { }

  public screenings: ChartSeries[];
  public categories: ChartSeries[];

  ngOnInit(): void {
    this.screeningService.getScreenings().subscribe(data => this.screenings = data);
    this.screeningService.getRadarChart().subscribe(data => this.categories = data);
  }

  selectScreening(data: ChartDataPoint): void {
    const screening = data.name.toLocaleDateString('de');
    console.log(screening + ' clicked');
  }

}
