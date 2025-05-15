import { revalidatePath } from 'next/cache';
import { deleteTodoUseCase } from '../usecases/delete-todo.usecase';

export async function deleteTodoAction(id: string) {
  const result = await deleteTodoUseCase(id);

  if (result.success) {
    revalidatePath('/');
  }

  return result;
}
