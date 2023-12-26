import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  imports: [CommonModule, NgApexchartsModule],
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
})
export class DashboardChartComponent {
  chartOptions: ChartOptions;

  constructor() {
    let ts2 = 1484418600000;
    const dates = [{ x: ts2, y: 0 }];
    for (let i = 0; i < 30; i++) {
      ts2 = ts2 + 60 * 3600;
      dates.push({ x: ts2, y: Math.floor(Math.random() * 90) + 10 });
    }

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
      },
      theme: {
        mode: 'dark',
      },
      markers: {
        size: 4,
      },
      tooltip: {
        enabled: true,
        custom: function ({ series, seriesIndex, dataPointIndex }): string {
          return `<span class="fs-4">${series[seriesIndex][dataPointIndex]}</span>`;
        },
      },
      series: [
        {
          data: dates,
        },
      ],
      xaxis: {
        type: 'datetime',
      },
    };
  }
}
