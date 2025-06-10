import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '../models/todo.model';
import * as TodoActions from './todo.actions';

export interface TodoState extends EntityState<Todo> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
});

export const initialState: TodoState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const todoReducer = createReducer(
  initialState,

  // ─── Load ───────────────────────────────────────────
  on(TodoActions.loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }) =>
    adapter.setAll(todos, { ...state, loading: false })
  ),
  on(TodoActions.loadTodosFailure, (state) => ({
    ...state,
    loading: false,
    error: 'Failed to load todos',
  })),

  // ─── Add ────────────────────────────────────────────
  on(TodoActions.addTodoSuccess, (state, { todo }) =>
    adapter.addOne(todo, state)
  ),
  on(TodoActions.addTodoFailure, (state) => ({
    ...state,
    error: 'Failed to add todo',
  })),

  // ─── Update ─────────────────────────────────────────
  on(TodoActions.updateTodoSuccess, (state, { todo }) =>
    adapter.updateOne({ id: todo.id, changes: todo }, state)
  ),
  on(TodoActions.updateTodoFailure, (state) => ({
    ...state,
    error: 'Failed to update todo',
  })),

  // ─── Delete ─────────────────────────────────────────
  on(TodoActions.deleteTodoSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
  on(TodoActions.deleteTodoFailure, (state) => ({
    ...state,
    error: 'Failed to delete todo',
  })),

  // ─── Toggle Completed ───────────────────────────────
  on(TodoActions.toggleTodoCompletedSuccess, (state, { todo }) =>
    adapter.updateOne({ id: todo.id, changes: { completed: todo.completed } }, state)
  ),
  on(TodoActions.toggleTodoCompletedFailure, (state) => ({
    ...state,
    error: 'Failed to toggle completion status',
  }))
);

// Export selectors
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
