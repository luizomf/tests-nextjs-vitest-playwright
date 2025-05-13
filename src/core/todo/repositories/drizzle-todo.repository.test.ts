import {
  insertTestTodos,
  makeTestTodoRepository,
} from '@/core/__tests__/utils/make-test-todo-repository';

describe('DrizzleTodoRepository (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  describe('findAll', () => {
    test('deve retornar um array vazio se a tabela estiver limpa', async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.findAll();
      expect(result).toStrictEqual([]);
      expect(result).toHaveLength(0);
    });

    test('deve retornar todos os TODOs em ordem decrescente', async () => {
      const { repository } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.findAll();
      expect(result[0].createdAt).toBe('date 4');
      expect(result[1].createdAt).toBe('date 3');
      expect(result[2].createdAt).toBe('date 2');
      expect(result[3].createdAt).toBe('date 1');
      expect(result[4].createdAt).toBe('date 0');
    });
  });

  describe('create', () => {
    test('cria um todo se os dados estão válidos', async () => {
      const { repository, todos } = await makeTestTodoRepository();
      const newTodo = await repository.create(todos[0]);
      expect(newTodo).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    test('falha se houver uma descrição igual na tabela', async () => {
      const { repository, todos } = await makeTestTodoRepository();

      // Cria um novo todo
      await repository.create(todos[0]);

      // Tenta criar um outro todo com a mesma descrição
      const anotherTodo = {
        id: 'any id',
        description: todos[0].description,
        createdAt: 'any date',
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ['Já existe um todo com o ID ou descrição enviados'],
      });
    });

    test('falha se houver um ID igual na tabela', async () => {
      const { repository, todos } = await makeTestTodoRepository();

      // Cria um novo todo
      await repository.create(todos[0]);

      // Tenta criar um outro todo com o mesmo ID
      const anotherTodo = {
        id: todos[0].id,
        description: 'any description',
        createdAt: 'any date',
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ['Já existe um todo com o ID ou descrição enviados'],
      });
    });

    test('falha se houver um ID e Descrição iguais', async () => {
      const { repository, todos } = await makeTestTodoRepository();

      await repository.create(todos[0]);

      const anotherTodo = {
        id: todos[0].id,
        description: todos[0].description,
        createdAt: 'any date',
      };
      const result = await repository.create(anotherTodo);

      expect(result).toStrictEqual({
        success: false,
        errors: ['Já existe um todo com o ID ou descrição enviados'],
      });
    });
  });

  describe('remove', () => {
    test('apaga um todo se ele existir', async () => {
      const { repository, todos } = await makeTestTodoRepository();
      await insertTestTodos();
      const result = await repository.remove(todos[0].id);

      expect(result).toStrictEqual({
        success: true,
        todo: todos[0],
      });
    });

    test('falha ao apagar se o todo não existir', async () => {
      const { repository } = await makeTestTodoRepository();
      const result = await repository.remove('any id');

      expect(result).toStrictEqual({
        success: false,
        errors: ['Todo não existe'],
      });
    });
  });
});
