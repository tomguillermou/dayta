import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

import { Dashboard, NewDashboard } from './dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _dashboardCollection = collection(this._firetore, 'dashboards');

  constructor(private _firetore: Firestore) {}

  async createDashboard(dashboard: NewDashboard): Promise<Dashboard> {
    const docRef = await addDoc(this._dashboardCollection, { ...dashboard, createdAt: new Date() });
    console.log('🚀  docRef:', docRef);

    return { ...docRef } as unknown as Dashboard;
  }
}
