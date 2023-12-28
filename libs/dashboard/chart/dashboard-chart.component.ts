import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexMarkers,
  ApexStroke,
  ApexTheme,
  ApexXAxis,
  NgApexchartsModule,
  ApexTooltip,
} from 'ng-apexcharts';
import { combineLatest, map, tap } from 'rxjs';

import { selectDashboard } from '@libs/store';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  theme: ApexTheme;
  markers: ApexMarkers;
  tooltip: ApexTooltip;
};

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgApexchartsModule],
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
})
export class DashboardChartComponent {
  vm$ = combineLatest(this.store.select(selectDashboard)).pipe(
    map(([dashboard]) => ({ dashboard })),
    tap(({ dashboard }) => {
      if (dashboard) {
        this.chartOptions.series = [{ data: dashboard.chart_data }];
      }
    })
  );

  chartOptions: ChartOptions;

  constructor(private store: Store) {
    this.chartOptions = {
      chart: {
        height: 600,
        type: 'line',
        background: '#212529',
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: 'straight',
        colors: ['#0d6efd'],
      },
      theme: { mode: 'dark' },
      markers: {
        size: 4,
        colors: ['#0d6efd'],
      },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex }): string {
          return `<span class="fs-4">${series[seriesIndex][dataPointIndex]}</span>`;
        },
      },
      series: [{ data: [] }],
      xaxis: { type: 'datetime' },
    };
  }
}
