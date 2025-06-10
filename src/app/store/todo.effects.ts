import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as TodoActions from './todo.actions';
import { Todo } from '../models/todo.model';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() => {
        try {
          const todos = this.getTodosFromLocalStorage();
          return of(TodoActions.loadTodosSuccess({ todos }));
        } catch {
          return of(TodoActions.loadTodosFailure());
        }
      })
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      mergeMap(({ todo }) => {
        try {
          const created = this.createTodo(todo);
          return of(TodoActions.addTodoSuccess({ todo: created }));
        } catch {
          return of(TodoActions.addTodoFailure());
        }
      })
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap(({ todo }) => {
        try {
          const updated = this.updateTodoInLocalStorage(todo);
          return of(TodoActions.updateTodoSuccess({ todo: updated }));
        } catch {
          return of(TodoActions.updateTodoFailure());
        }
      })
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap(({ id }) => {
        try {
          this.deleteTodoFromLocalStorage(id);
          return of(TodoActions.deleteTodoSuccess({ id }));
        } catch {
          return of(TodoActions.deleteTodoFailure());
        }
      })
    )
  );

  toggleTodoCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.toggleTodoCompleted),
      mergeMap(({ id }) => {
        try {
          const updated = this.toggleCompletedInLocalStorage(id);
          return of(TodoActions.toggleTodoCompletedSuccess({ todo: updated }));
        } catch {
          return of(TodoActions.toggleTodoCompletedFailure());
        }
      })
    )
  );

  // ====== LocalStorage Utilities ======

  private getTodosFromLocalStorage(): Todo[] {
    const raw = localStorage.getItem('todos');
    return raw ? JSON.parse(raw) : [];
  }

  private saveTodosToLocalStorage(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  private createTodo(todo: Todo): Todo {
    const todos = this.getTodosFromLocalStorage();
    const newTodo: Todo = { ...todo };
    todos.push(newTodo);
    this.saveTodosToLocalStorage(todos);
    return newTodo;
  }

  private updateTodoInLocalStorage(todo: Todo): Todo {
    const todos = this.getTodosFromLocalStorage();
    const index = todos.findIndex((t) => t.id === todo.id);
    if (index !== -1) {
      todos[index] = todo;
      this.saveTodosToLocalStorage(todos);
    }
    return todo;
  }

  private deleteTodoFromLocalStorage(id: string): void {
    const todos = this.getTodosFromLocalStorage();
    const updated = todos.filter((t) => t.id !== id);
    this.saveTodosToLocalStorage(updated);
  }

  private toggleCompletedInLocalStorage(id: string): Todo {
    const todos = this.getTodosFromLocalStorage();
    const index = todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      todos[index].completed = !todos[index].completed;
      this.saveTodosToLocalStorage(todos);
      return todos[index];
    }
    throw new Error('Todo not found');
  }
}
