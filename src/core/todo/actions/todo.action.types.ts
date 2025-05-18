import { createTodoAction } from './create-todo.action';
import { deleteTodoAction } from './delete-todo.action';

export type CreateTodoAction = typeof createTodoAction;
export type DeleteTodoAction = typeof deleteTodoAction;
