export type Dashboard = {
  id: string;
  name: string;
  description: string;
  user_id: string;
  chart_data: Array<{ x: number; y: number }>;
  created_at: Date;
};
