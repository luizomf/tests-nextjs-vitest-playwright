import { Todo } from '../schemas/todo.contract';

export function makeNewTodo(description: string): Todo {
  return {
    id: crypto.randomUUID(),
    description,
    createdAt: new Date().toISOString(),
  };
}
