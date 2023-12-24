export type Dashboard = {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  createdAt: Date;
};

export type NewDashboard = Omit<Dashboard, 'id' | 'createdAt'>;
