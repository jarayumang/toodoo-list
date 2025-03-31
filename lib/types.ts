export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  created_date: string;
  completed_date: string;
  due_date: string | null;
  priority: string;
}