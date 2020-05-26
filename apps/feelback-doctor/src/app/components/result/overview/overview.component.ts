import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { ChartSeries } from '../../../models/ChartSeries';
import { Screening } from '../../../models/Screening';
import { Router, ActivatedRoute } from '@angular/router';
import { Parser } from 'expr-eval';

@Component({
  selector: 'feelback-doctor-screening-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  constructor(
    public commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.currentView = params['overview'] ? params['overview'] : 'Radar';
    });
  }

  @Input() screening: Screening;
  @Input() diagram;
  public chartData: ChartSeries[];
  public currentViewMapping: {} = {
    fromIndex: { 0: 'Radar', 1: 'Progress', 2: 'Table' },
    toIndex: { Radar: 0, Progress: 1, Table: 2 },
  };
  public currentView: string;
  public displayedColumns: string[] = ['name', 'positive', 'total'];
  public data = [];

  ngOnInit(): void {
    const result = this.transformScreeningResult(this.screening.result);

    for (const axis of this.diagram['instance']['overview']['axis']) {
      const ruleParts = axis.rule.split('/');
      const positive = Parser.evaluate(ruleParts[0], result);
      this.data.push({
        name: axis.name,
        positive: positive,
        total: ruleParts[1]
      });
    }

    this.transformDataForChart();
  }

  private transformDataForChart() {
    this.chartData = [
      {
        name: 'Category',
        series: [],
      },
    ];

    for (const record of this.data) {
      this.chartData[0]['series'].push({
        name: record.name,
        value: record.positive / record.total,
      });
    }
  }

  private transformScreeningResult(result) {
    let resultString = JSON.stringify(result);
    resultString = resultString
      .replace(new RegExp('true', 'g'), '1')
      .replace(new RegExp('false', 'g'), '0');
    return JSON.parse(resultString);
  }

  public changePage($event) {
    this.currentView = this.currentViewMapping['fromIndex'][$event.pageIndex];
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        overview: this.currentView,
      },
      queryParamsHandling: 'merge',
    });
  }
}
