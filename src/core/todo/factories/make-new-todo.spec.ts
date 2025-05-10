import { makeNewTodo } from './make-new-todo';

describe('makeNewTodo (unit)', () => {
  test('deve retornar um novo todo válido', () => {
    // AAA -> Arrange, Act, Assert
    // Arrange -> Criar as coisas que eu preciso
    const expectedTodo = {
      id: expect.any(String),
      description: 'meu novo todo',
      createdAt: expect.any(String),
    };

    // Act
    const newTodo = makeNewTodo('meu novo todo');

    // Assert
    // toBe ===
    // toEqual toStrictEqual
    // Checando apenas a description
    expect(newTodo.description).toBe(expectedTodo.description);

    // Checando o objeto inteiro
    expect(newTodo).toStrictEqual(expectedTodo);
  });
});
