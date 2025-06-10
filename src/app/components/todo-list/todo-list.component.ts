import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import {
  addTodo,
  deleteTodo,
  updateTodo
} from 'src/app/store/todo.actions';
import {
  selectTodos,
  selectLoading,
  selectError
} from 'src/app/store/todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  // UI States
  searchText: string = '';
  filterCategory: string = '';
  filterPriority: string = '';
  filterStatus: string = '';

  isModalOpen: boolean = false;
  isEditMode: boolean = false;

  newTask: Partial<Todo> = {};
  editingId: string | null = null;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectTodos);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {}

  /** Open modal in create mode */
  openModal(): void {
    this.isModalOpen = true;
    this.isEditMode = false;
    this.newTask = {};
    this.editingId = null;
  }

  /** Close modal and reset */
  closeModal(): void {
    this.isModalOpen = false;
    this.newTask = {};
    this.editingId = null;
    this.isEditMode = false;
  }

  /** Add or update task */
  submitTask(): void {
    const { task, priority, category } = this.newTask;

    if (task && priority && category) {
      const todo: Todo = {
        id: this.editingId || Math.random().toString(36).substring(2),
        task: task.trim(),
        description: this.newTask.description?.trim() || '',
        priority,
        category,
        completed: this.newTask.completed ?? false  // ✅ Ensure completed is included
      };

      if (this.isEditMode) {
        this.store.dispatch(updateTodo({ todo }));
      } else {
        this.store.dispatch(addTodo({ todo }));
      }

      this.closeModal();
    }
  }

  /** Delete a todo item */
  deleteTodo(id: string): void {
    this.store.dispatch(deleteTodo({ id }));
  }

  /** Load task into modal for editing */
  editTask(todo: Todo): void {
    this.newTask = { ...todo };
    this.editingId = todo.id;
    this.isEditMode = true;
    this.isModalOpen = true;
  }
}
