import * as sanitizeStrMod from '@/utils/sanitize-str';
import { makeValidatedTodo } from './make-validated-todo';
import * as makeNewTodoMod from './make-new-todo';
import * as validateTodoDescriptionMod from '../schemas/validate-todo-description';
import { InvalidTodo, ValidTodo } from '../schemas/todo.contract';

describe('makeValidatedTodo (unit)', () => {
  test('deve chamar a função sanitizeStr com o valor correto', () => {
    const { description, sanitizeStrSpy } = makeMocks();
    makeValidatedTodo(description);
    expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
  });

  test('deve chamar a validateTodoDescription com o retorno de sanitizeStr', () => {
    const { description, sanitizeStrSpy, validaTodoDescriptionSpy } =
      makeMocks();

    const sanitizeStrReturn = 'retorno da sanitizeStr';
    sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);

    makeValidatedTodo(description) as ValidTodo;

    expect(validaTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(
      sanitizeStrReturn,
    );
  });

  test('deve chamar makeNewTodo se validatedDescription retornou sucesso', () => {
    const { description } = makeMocks();
    const result = makeValidatedTodo(description) as ValidTodo;

    expect(result.success).toBe(true);

    expect(result.todo.id).toBe('any-id');
    expect(result.todo.description).toBe('abcd');
    expect(result.todo.createdAt).toBe('any-date');
  });

  test('deve chamar retornar validatedDescription.error se a validação falhou', () => {
    const { errors, description, validaTodoDescriptionSpy } = makeMocks();
    validaTodoDescriptionSpy.mockReturnValue({ errors, success: false });
    const result = makeValidatedTodo(description) as InvalidTodo;
    expect(result).toStrictEqual({ errors, success: false });
  });
});

const makeMocks = (description = 'abcd') => {
  const errors = ['any', 'error'];

  const todo = {
    id: 'any-id',
    description,
    createdAt: 'any-date',
  };

  const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, 'sanitizeStr')
    .mockReturnValue(description);

  const validaTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, 'validateTodoDescription')
    .mockReturnValue({
      errors: [],
      success: true,
    });

  const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, 'makeNewTodo')
    .mockReturnValue(todo);

  return {
    errors,
    todo,
    description,
    sanitizeStrSpy,
    validaTodoDescriptionSpy,
    makeNewTodoSpy,
  };
};
