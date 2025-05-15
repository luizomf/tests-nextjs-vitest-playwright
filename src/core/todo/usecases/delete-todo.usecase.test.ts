import { makeTestTodoRepository } from '@/core/__tests__/utils/make-test-todo-repository';
import { deleteTodoUseCase } from './delete-todo.usecase';

describe('deleteTodoUseCase (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  test('deve retornar erro se o ID for inválido', async () => {
    const result = await deleteTodoUseCase('');

    expect(result).toStrictEqual({
      errors: ['ID inválido'],
      success: false,
    });
  });

  test('deve retornar sucesso se o TODO existe na base de dados', async () => {
    const { insertTodoDb, todos } = await makeTestTodoRepository();
    await insertTodoDb().values(todos);

    const result = await deleteTodoUseCase(todos[0].id);

    expect(result).toStrictEqual({
      success: true,
      todo: todos[0],
    });
  });

  test('deve retornar erro se o todo não existe na base de dados', async () => {
    const result = await deleteTodoUseCase('this-does-not-exist');

    expect(result).toStrictEqual({
      errors: ['Todo não existe'],
      success: false,
    });
  });
});
