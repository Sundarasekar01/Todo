export type Priority = 'Low' | 'Medium' | 'High';
export type Category = 'Work' | 'Personal' | 'Other';

export interface Todo {
  id: string;
  task: string;
  description: string;
  priority: Priority;
  category: Category;
  completed: boolean; // ✅ Add this line
}
