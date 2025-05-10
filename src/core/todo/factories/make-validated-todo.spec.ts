import * as sanitizeStrMod from '@/utils/sanitize-str';
import { makeValidatedTodo } from './make-validated-todo';

describe('makeValidatedTodo (unit)', () => {
  test('deve chamar a função sanitizeStr com o valor correto', () => {
    // Arrange
    const description = 'abcd';
    const sanitizeStrSpy = vi
      .spyOn(sanitizeStrMod, 'sanitizeStr')
      .mockReturnValue(description);

    // Act
    makeValidatedTodo(description);

    // Assert
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
    expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
    expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
  });

  // test('deve chamar a validateTodoDescription com o retorno de sanitizeStr', () => {});

  // test('deve chamar makeNewTodo se validatedDescription retornou sucesso', () => {});

  // test('deve chamar retornar validatedDescription.error se a validação falhou', () => {});
});
