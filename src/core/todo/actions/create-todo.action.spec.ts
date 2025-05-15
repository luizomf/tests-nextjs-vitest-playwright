import * as createTodoUseCaseMod from '@/core/todo/usecases/create-todo.usecase';
import { InvalidTodo, ValidTodo } from '../schemas/todo.contract';
import { revalidatePath } from 'next/cache';
import { createTodoAction } from './create-todo.action';

vi.mock('next/cache', () => {
  return {
    revalidatePath: vi.fn(),
  };
});

describe('createTodoAction (unit)', () => {
  test('deve chamar o createTodoUseCase com os valores corretos', async () => {
    const { createTodoUseCaseSpy } = makeMocks();
    const expectedParamCall = 'Usecase should be called with this';
    await createTodoAction(expectedParamCall);

    expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(
      expectedParamCall,
    );
  });

  test('deve chamar o revalidatePath se o usecase retornar sucesso', async () => {
    const { revalidatePathMocked } = makeMocks();
    const description = 'Usecase should be called with this';
    await createTodoAction(description);

    expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
  });

  test('deve retornar o mesmo valor do usecase em caso de sucesso', async () => {
    const { successResult } = makeMocks();
    const description = 'Usecase should be called with this';
    const result = await createTodoAction(description);

    expect(result).toStrictEqual(successResult);
  });

  test('deve retornar o mesmo valor do usecase em caso de erro', async () => {
    const { createTodoUseCaseSpy, errorResult } = makeMocks();
    const description = 'Usecase should be called with this';

    createTodoUseCaseSpy.mockResolvedValue(errorResult);

    const result = await createTodoAction(description);

    expect(result).toStrictEqual(errorResult);
  });
});

const makeMocks = () => {
  const successResult = {
    success: true,
    todo: {
      id: 'id',
      description: 'description',
      createdAt: 'createdAt',
    },
  } as ValidTodo;

  const errorResult = {
    success: false,
    errors: ['any', 'error'],
  } as InvalidTodo;

  const createTodoUseCaseSpy = vi
    .spyOn(createTodoUseCaseMod, 'createTodoUseCase')
    .mockResolvedValue(successResult);
  const revalidatePathMocked = vi.mocked(revalidatePath);

  return {
    successResult,
    errorResult,
    createTodoUseCaseSpy,
    revalidatePathMocked,
  };
};
