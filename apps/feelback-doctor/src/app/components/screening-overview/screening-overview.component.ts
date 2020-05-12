import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ScreeningService } from '../../services/screening.service';
import { Category } from '../../models/Category';
import { ChartSeries } from '../../models/ChartSeries';
import { Screening } from '../../models/Screening';
import { Router, ActivatedRoute } from '@angular/router';

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
  public chartData: ChartSeries[];
  public currentViewMapping: {} = {
    fromIndex: { 0: 'Radar', 1: 'Progress', 2: 'Table' },
    toIndex: { Radar: 0, Progress: 1, Table: 2 },
  };
  public currentView: string;
  public displayedColumns: string[] = ['name', 'positive', 'total'];

  ngOnInit(): void {
    this.transformCategoryToChart(this.screening.categories);
  }

  private transformCategoryToChart(categories: Category[]) {
    this.chartData = [
      {
        name: 'Category',
        series: [],
      },
    ];
    for (const category of categories) {
      this.chartData[0]['series'].push({
        name: category.name,
        value: (category.positive / category.total) * 100,
      });
    }
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
