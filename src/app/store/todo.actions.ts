import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

// ─── Load Todos ──────────────────────────────────────
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction('[Todo] Load Todos Failure');

// ─── Add Todo ────────────────────────────────────────
export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ todo: Todo }>()
);
export const addTodoSuccess = createAction(
  '[Todo] Add Todo Success',
  props<{ todo: Todo }>()
);
export const addTodoFailure = createAction('[Todo] Add Todo Failure');

// ─── Update Todo ─────────────────────────────────────
export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: Todo }>()
);
export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ todo: Todo }>()
);
export const updateTodoFailure = createAction('[Todo] Update Todo Failure');

// ─── Delete Todo ─────────────────────────────────────
export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: string }>()
);
export const deleteTodoSuccess = createAction(
  '[Todo] Delete Todo Success',
  props<{ id: string }>()
);
export const deleteTodoFailure = createAction('[Todo] Delete Todo Failure');

// ─── Reorder Todos (e.g., Drag & Drop) ───────────────
export const reorderTodos = createAction(
  '[Todo] Reorder Todos',
  props<{ todos: Todo[] }>()
);

// ─── Toggle Completion Status ────────────────────────
export const toggleTodoCompleted = createAction(
  '[Todo] Toggle Todo Completed',
  props<{ id: string; completed: boolean }>()
);
export const toggleTodoCompletedSuccess = createAction(
  '[Todo] Toggle Todo Completed Success',
  props<{ todo: Todo }>()
);
export const toggleTodoCompletedFailure = createAction(
  '[Todo] Toggle Todo Completed Failure'
);
