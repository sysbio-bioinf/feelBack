import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Category } from '../../models/Category';
import { ChartSeries } from '../../models/ChartSeries';
import { Screening } from '../../models/Screening';
import { Router, ActivatedRoute } from '@angular/router';
import { Parser } from 'expr-eval';

@Component({
  selector: 'feelback-doctor-screening-overview',
  templateUrl: './screening-overview.component.html',
  styleUrls: ['./screening-overview.component.scss'],
})
export class ScreeningOverviewComponent implements OnInit {
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

  ngOnInit(): void {
    this.transformCategoryToChart(this.diagram);
  }

  private transformCategoryToChart(diagram: {}) {
    this.chartData = [
      {
        name: 'Category',
        series: [],
      },
    ];

    const result = this.transformScreeningResult(this.screening.result);

    for (const axis of diagram['overview']['axis']) {
      const value = Parser.evaluate(axis.rule, result)*100;
      this.chartData[0]['series'].push({
        name: axis.name,
        value,
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
