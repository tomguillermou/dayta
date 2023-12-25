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

  async deleteDashboard(dashboardId: Dashboard['id']): Promise<void> {
    return this._supabaseService.deleteDocumentById({
      tableName: this.tableName,
      documentId: dashboardId,
    });
  }

  async getDashboardsForOwner(ownerId: Dashboard['owner_id']): Promise<Dashboard[]> {
    return this._supabaseService.getDocuments<Dashboard>({
      tableName: this.tableName,
      query: { owner_id: ownerId },
    });
  }

  async updateDashboard(params: {
    dashboardId: Dashboard['id'];
    fields: Partial<Pick<Dashboard, 'name' | 'description'>>;
  }): Promise<Dashboard> {
    return this._supabaseService.updateDocumentById<Dashboard>({
      tableName: this.tableName,
      documentId: params.dashboardId,
      document: { ...params.fields },
    });
  }
}
