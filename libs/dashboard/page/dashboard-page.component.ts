import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '@libs/sidebar';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, SidebarComponent, RouterOutlet],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent {}
