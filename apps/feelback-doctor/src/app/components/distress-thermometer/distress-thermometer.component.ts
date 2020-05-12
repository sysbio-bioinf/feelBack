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
import { Parser } from 'expr-eval';

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

  private createRadarChart() {
    // this.overview = [
    //   {
    //     name: 'Overview',
    //     series: [],
    //   },
    // ];
    // console.log(
    //   Parser.evaluate(
    //     this.instrument.diagram.overview.axis.fp,
    //     this.screening.result,
    //   ),
    // );
  }

  public selectScreening(data: ChartDataPoint): void {
    const screening = data.name.toLocaleDateString('de');
    this.selectedScreening = screening;
    this.expansionPanel.close();
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        screening: screening,
      },
      queryParamsHandling: 'merge',
    });
  }
}
