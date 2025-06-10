import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo.model';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {
  transform(
    todos: Todo[],
    searchText: string = '',
    category: string = '',
    priority: string = '',
    status: string = ''
  ): Todo[] {
    if (!todos || todos.length === 0) return [];

    const search = searchText.trim().toLowerCase();
    const categoryFilter = category.trim().toLowerCase();
    const priorityFilter = priority.trim().toLowerCase();
    const statusFilter = status.trim().toLowerCase(); // 'completed' | 'incomplete' | ''

    return todos.filter(todo => {
      const taskText = todo.task?.toLowerCase() || '';
      const todoCategory = todo.category?.toLowerCase() || '';
      const todoPriority = todo.priority?.toLowerCase() || '';
      const todoStatus = todo.completed ? 'completed' : 'incomplete';

      const matchesSearch = taskText.includes(search);
      const matchesCategory = categoryFilter ? todoCategory === categoryFilter : true;
      const matchesPriority = priorityFilter ? todoPriority === priorityFilter : true;
      const matchesStatus = statusFilter ? todoStatus === statusFilter : true;

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });
  }
}
