import { ChartDataPoint } from './chart-data-point.model';

export class ChartSeries {
  name: string;
  series: ChartDataPoint[] = [];
}
