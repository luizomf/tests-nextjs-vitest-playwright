import { sanitizeStr } from '@/utils/sanitize-str';
import { validateTodoDescription } from '../schemas/validate-todo-description';
import { makeNewTodo } from './make-new-todo';
import { Todo } from '../schemas/todo.contract';

type InvalidTodo = {
  success: false;
  errors: string[];
};

type ValidTodo = {
  success: true;
  data: Todo;
};

type MakeValidatedTodo = ValidTodo | InvalidTodo;

export function makeValidatedTodo(description: string): MakeValidatedTodo {
  const cleanDescription = sanitizeStr(description);
  const validatedDescription = validateTodoDescription(cleanDescription);

  if (validatedDescription.success) {
    return {
      success: true,
      data: makeNewTodo(cleanDescription),
    };
  }

  return {
    success: false,
    errors: validatedDescription.errors,
  };
}
