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
import { MatExpansionPanel } from '@angular/material/expansion';
import { Instrument } from '../../graphql/generated/feelback.graphql';

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
  ) {}

  @Input() instrument: Instrument;
  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel;
  public screenings: ChartSeries[];
  public overview: ChartSeries[];
  public selectedScreening: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedScreening = params['screening'];
    });
    this.screeningService
      .getScreenings()
      .subscribe((data) => (this.screenings = data));
    this.screeningService
      .getRadarChart()
      .subscribe((data) => (this.overview = data));
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (!params['screening']) {
        this.expansionPanel.open();
      }
    });
  }

  public selectScreening(screening: ChartDataPoint): void {
    this.selectedScreening = screening.id;
    this.expansionPanel.close();
    this.router.navigate(['screenings', this.selectedScreening], {
      relativeTo: this.route,
    });
  }
}
