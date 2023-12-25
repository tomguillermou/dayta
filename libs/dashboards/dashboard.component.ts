import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Dashboard } from './dashboard';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @Input() dashboard!: Dashboard;
}
