import { render, screen, within } from '@testing-library/react';
import { TodoContainer } from '.';
import {
  insertTestTodos,
  makeTestTodoRepository,
} from '@/core/__tests__/utils/make-test-todo-repository';

describe('<TodoContainer /> (integration)', () => {
  beforeEach(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
    await insertTestTodos();
  });

  afterAll(async () => {
    const { deleteTodoNoWhere } = await makeTestTodoRepository();
    await deleteTodoNoWhere();
  });

  test('deve renderizar TodoList e TodoForm na tela', async () => {
    render(await TodoContainer());

    const headingAccessibleName = 'Lista de tarefas';
    const heading = screen.getByRole('heading', {
      name: headingAccessibleName,
    });
    const list = screen.getByRole('list', { name: headingAccessibleName });
    const listItems = within(list).getAllByRole('listitem');
    const input = screen.getByLabelText('Tarefa');
    const btn = screen.getByRole('button', { name: 'Criar tarefa' });

    expect(heading).toHaveTextContent(headingAccessibleName);
    expect(list).toHaveAttribute('aria-labelledby', heading.id);
    expect(listItems).toHaveLength(5);
    expect(input).toHaveAttribute('placeholder', 'Digite sua tarefa');
    expect(btn).toHaveAttribute('type', 'submit');
  });
});
