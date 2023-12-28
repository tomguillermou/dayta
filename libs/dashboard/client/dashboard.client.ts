import { Injectable } from '@angular/core';

import { SupabaseService } from '@libs/supabase';

import { Dashboard, NewDashboard } from '../dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardClient {
  constructor(private supabase: SupabaseService) {}

  async createDashboard(dashboard: NewDashboard): Promise<Dashboard | null> {
    const { data, error } = await this.supabase.client
      .from('dashboards')
      .insert(dashboard)
      .select()
      .single<Dashboard>();

    if (error) {
      throw error;
    }

    return data;
  }

  async getDashboardById(dashboard_id: Dashboard['id']): Promise<Dashboard | null> {
    const { data, error } = await this.supabase.client
      .from('dashboards')
      .select()
      .eq('id', dashboard_id)
      .single<Dashboard>();

    if (error) {
      throw error;
    }

    return data;
  }

  async getDashboardsByUserId(userId: Dashboard['user_id']): Promise<Array<Pick<Dashboard, 'id' | 'name'>>> {
    const { data, error } = await this.supabase.client
      .from('dashboards')
      .select('id, name')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (data as unknown as Array<Pick<Dashboard, 'id' | 'name'>>) ?? [];
  }

  async updateDashboardById(
    dashboard_id: Dashboard['id'],
    updates: Partial<Pick<Dashboard, 'name' | 'description'>>
  ): Promise<Dashboard | null> {
    const { data, error } = await this.supabase.client
      .from('dashboards')
      .update(updates)
      .eq('id', dashboard_id)
      .select()
      .single<Dashboard>();

    if (error) {
      throw error;
    }

    return data;
  }

  async deleteDashboardById(dashboard_id: Dashboard['id']): Promise<Dashboard | null> {
    const { data, error } = await this.supabase.client
      .from('dashboards')
      .delete()
      .eq('id', dashboard_id)
      .select()
      .single<Dashboard>();

    if (error) {
      throw error;
    }

    return data;
  }
}
