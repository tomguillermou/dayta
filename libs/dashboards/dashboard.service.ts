import { Injectable } from '@angular/core';

import { SupabaseService } from '@libs/supabase';

import { Dashboard, NewDashboard } from './dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly tableName = 'dashboards';

  constructor(private _supabaseService: SupabaseService) {}

  async createDashboard(dashboard: NewDashboard): Promise<Dashboard> {
    return this._supabaseService.insertDocument<NewDashboard, Dashboard>({
      tableName: this.tableName,
      document: { ...dashboard },
    });
  }
}
