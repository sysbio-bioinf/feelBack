import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ChartDataPoint } from '../../models/ChartDataPoint';
import { ChartSeries } from '../../models/ChartSeries';
import { ScreeningService } from '../../services/screening.service';
import { CommonService } from '../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../../models/Patient';
import { Screening } from '../../models/Screening';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'feelback-doctor-distress-thermometer',
  templateUrl: './distress-thermometer.component.html',
  styleUrls: ['./distress-thermometer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DistressThermometerComponent implements OnInit, AfterViewInit {
  constructor(
    private screeningService: ScreeningService,
    public commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.screeningService
      .getScreening()
      .subscribe((screening) => (this.screening = screening));
  }

  @Input() patient: Patient;
  @Input() instrument: Patient;
  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel;
  public screenings: ChartSeries[];
  public categories: ChartSeries[];
  public screening: Screening;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.screening.date = params['screening'];
    });
    this.screeningService
      .getScreenings()
      .subscribe((data) => (this.screenings = data));
    this.screeningService
      .getRadarChart()
      .subscribe((data) => (this.categories = data));
  }

  ngAfterViewInit(): void{
    this.route.queryParams.subscribe((params) => {
      if(!params['screening']){
        this.expansionPanel.open();
      }
    });
  }

  public selectScreening(data: ChartDataPoint): void {
    const screening = data.name.toLocaleDateString('de');
    this.screening.date = screening;
    this.expansionPanel.close();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        screening: screening
      },
    })
  }

}
