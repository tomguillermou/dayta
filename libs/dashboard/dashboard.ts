export type Dashboard = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  chart_data: Array<{ x: number; y: number }>;
  created_at: Date;
};

export type NewDashboard = Pick<Dashboard, 'name' | 'description' | 'owner_id'>;
