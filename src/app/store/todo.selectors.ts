import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';
import { selectAll } from './todo.reducer';

// Feature selector
export const selectTodoState = createFeatureSelector<TodoState>('todos');

// Select all todos
export const selectTodos = createSelector(
  selectTodoState,
  selectAll
);

// Loading flag
export const selectLoading = createSelector(
  selectTodoState,
  (state) => state.loading
);

// Error
export const selectError = createSelector(
  selectTodoState,
  (state) => state.error
);
