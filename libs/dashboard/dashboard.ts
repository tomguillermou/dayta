export type Dashboard = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  created_at: Date;
};

export type NewDashboard = Omit<Dashboard, 'id' | 'created_at'>;
