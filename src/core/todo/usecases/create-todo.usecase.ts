import { makeValidatedTodo } from "../factories/make-validated-todo";
import { todoRepository } from "../repositories/default.repository";

export async function createTodoUseCase(description: string) {
  const validateResult = makeValidatedTodo(description);

  if (!validateResult.success) {
    return validateResult;
  }

  const createResult = await todoRepository.create(validateResult.todo);

  return createResult;
}
