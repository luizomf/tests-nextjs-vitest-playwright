import { validateTodoDescription } from './validate-todo-description';

describe('validateTodoDescription (unit)', () => {
  test('deve retornar erros quando a descrição tem menos que 4 caracteres', () => {
    const description = 'abc';
    const result = validateTodoDescription(description);

    expect(result.errors).toStrictEqual([
      'Descrição precisa ter mais de 3 caracteres',
    ]);
    expect(result.success).toBe(false);
  });

  test('deve retornar sucesso quando a descrição tem mais de 3 caracteres', () => {
    const description = 'abcd';
    const result = validateTodoDescription(description);

    expect(result.errors).toStrictEqual([]);
    expect(result.success).toBe(true);
  });
});
