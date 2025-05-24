import { revalidatePath } from 'next/cache';
import { deleteTodoUseCase } from '../usecases/delete-todo.usecase';
import { devOnlyDelay } from '@/utils/dev-only-delay';

export async function deleteTodoAction(id: string) {
  'use server';
  await devOnlyDelay(100);
  const result = await deleteTodoUseCase(id);

  if (result.success) {
    revalidatePath('/');
  }

  return result;
}
