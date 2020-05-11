import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ScreeningService } from '../../services/screening.service';
import { Category } from '../../models/Category';
import { ChartSeries } from '../../models/ChartSeries';
import { Screening } from '../../models/Screening';

@Component({
  selector: 'feelback-doctor-screening-overview',
  templateUrl: './screening-overview.component.html',
  styleUrls: ['./screening-overview.component.scss'],
})
export class ScreeningOverviewComponent implements OnInit {
  constructor(public commonService: CommonService) {}

  @Input() screening: Screening;
  public chartData: ChartSeries[];
  public currentViewIndex = 0;
  public currentView: {} = { 0: 'Radar', 1: 'Progress', 2: 'Table' };
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
    this.currentViewIndex = $event.pageIndex;
  }
}
