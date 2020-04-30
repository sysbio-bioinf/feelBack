import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as shape from 'd3-shape';
import { ChartDataPoint } from '../../models/ChartDataPoint';
import { ChartSeries } from '../../models/ChartSeries';
import { ScreeningService } from '../../services/screening.service';

@Component({
  selector: 'feelback-doctor-distress-thermometer',
  templateUrl: './distress-thermometer.component.html',
  styleUrls: ['./distress-thermometer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DistressThermometerComponent implements OnInit {

  constructor(private screeningService: ScreeningService) { }

  public xAxisTicks = [
    new Date(2019, 0, 1),
    new Date(2019, 1, 1),
    new Date(2019, 2, 1),
    new Date(2019, 3, 1),
    new Date(2019, 4, 1),
    new Date(2019, 5, 1),
    new Date(2019, 6, 1),
    new Date(2019, 7, 1),
    new Date(2019, 8, 1),
    new Date(2019, 9, 1),
    new Date(2019, 10, 1),
    new Date(2019, 11, 1),
    new Date(2020, 0, 1),
  ];
  public colorScheme = {domain: ['#00a3ff']};
  public curveStepAfter: any = shape.curveStepAfter;
  public curveLinear: any = shape.curveLinearClosed;
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
