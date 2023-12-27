import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
export class DashboardChartComponent implements OnInit {
  @Input() chartData!: Array<{ x: number; y: number }>;

  chartOptions!: ChartOptions;

  ngOnInit(): void {
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
      theme: {
        mode: 'dark',
      },
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
      series: [
        {
          data: this.chartData,
        },
      ],
      xaxis: {
        type: 'datetime',
      },
    };
  }
}
