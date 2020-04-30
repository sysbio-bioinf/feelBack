import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { ChartDataPoint } from '../../models/ChartDataPoint';
import { ChartSeries } from '../../models/ChartSeries';
import { ScreeningService } from '../../services/screening.service';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { Patient } from '../../models/Patient';
import { Screening } from '../../models/Screening';
import { MatExpansionPanel } from '@angular/material/expansion';

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
  ) {}

  @Input() patient: Patient;
  public screenings: ChartSeries[];
  public categories: ChartSeries[];
  public screening: Screening = new Screening();
  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel;

  ngOnInit(): void {
    this.screeningService
      .getScreenings()
      .subscribe((data) => (this.screenings = data));
    this.screeningService
      .getRadarChart()
      .subscribe((data) => (this.categories = data));
  }

  selectScreening(data: ChartDataPoint): void {
    const screening = data.name.toLocaleDateString('de');
    this.screening.date = screening;
    this.expansionPanel.close();
    this.router.navigateByUrl(
      '/patients/' +
        this.patient.id +
        '/instruments/a1cf3754-9aab-4530-9818-735bf63e53c8?screening=' +
        screening,
    );
  }
}
