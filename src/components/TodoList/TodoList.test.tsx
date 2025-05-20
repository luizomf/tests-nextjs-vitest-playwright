import { render, screen, waitFor, within } from '@testing-library/react';
import { TodoList } from '.';
import { mockTodos } from '@/core/__tests__/mocks/todos';
import { Todo } from '@/core/todo/schemas/todo.contract';
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

describe('<TodoList /> (integration)', () => {
  test('deve renderizar heading, lista e itens da lista de TODOs', async () => {
    const { todos } = renderList();

    const heading = screen.getByRole('heading', {
      name: /lista de tarefas/i,
      level: 1,
    });
    const list = screen.getByRole('list', { name: /lista de tarefas/i });
    const items = screen.getAllByRole('listitem');

    expect(heading).toBeInTheDocument();
    expect(list).toHaveAttribute('aria-labelledby', heading.id);

    expect(items).toHaveLength(todos.length);

    items.forEach((item, index) => {
      expect(item).toHaveTextContent(todos[index].description);
    });
  });

  test('não deve renderizar a lista de items sem TODOs', async () => {
    renderList({ todos: [] });

    const list = screen.queryByRole('list', { name: /lista de tarefas/i });

    expect(list).not.toBeInTheDocument();
  });

  test('deve chamar a action correta para cada item da lista', async () => {
    const { action, todos } = renderList();

    const items = screen.getAllByRole('listitem');
    const btn0 = within(items[0]).getByRole('button');
    const btn1 = within(items[1]).getByRole('button');
    const btn2 = within(items[2]).getByRole('button');

    await user.click(btn0);
    await user.click(btn1);
    await user.click(btn2);

    expect(action).toHaveBeenCalledTimes(3);

    expect(action.mock.calls[0][0]).toBe(todos[0].id);
    expect(action.mock.calls[1][0]).toBe(todos[1].id);
    expect(action.mock.calls[2][0]).toBe(todos[2].id);
  });

  test('deve desativar os items da lista enquanto envia a action', async () => {
    renderList({ delay: 10 });

    const list = screen.getByRole('list', { name: /lista de tarefas/i });
    const items = screen.getAllByRole('listitem');
    const btns = within(list).getAllByRole('button');
    await user.click(btns[1]);

    const expectedDisabledCls = 'bg-gray-200 text-gray-900 hover:scale-100';
    const expectedEnabledCls = 'bg-amber-200 text-amber-900 hover:scale-105';

    await waitFor(() => {
      items.forEach(item => expect(item).toHaveClass(expectedDisabledCls));
    });

    await waitFor(() => {
      items.forEach(item => expect(item).toHaveClass(expectedEnabledCls));
    });
  });

  test('deve desativar os botões da lista enquanto envia a action', async () => {
    renderList({ delay: 10 });

    const list = screen.getByRole('list', { name: /lista de tarefas/i });
    const btns = within(list).getAllByRole('button');
    await user.click(btns[1]);

    await waitFor(() => {
      btns.forEach(btn => expect(btn).toBeDisabled());
    });

    await waitFor(() => {
      btns.forEach(btn => expect(btn).toBeEnabled());
    });
  });

  test('deve avisar o usuário se houver erro ao apagar o TODO', async () => {
    renderList({ success: false });

    const alertFn = vi.fn();
    vi.stubGlobal('alert', alertFn);
    const btns = screen.getAllByRole('button');
    await user.click(btns[1]);

    expect(alertFn).toHaveBeenCalledExactlyOnceWith('falha ao apagar todo');
  });

  test('não deve chamar a action se o ID for inválido, vazio ou formado apenas com espaços', async () => {
    const { action } = renderList({
      todos: [{ id: '     ', description: '', createdAt: '' }],
    });

    const item = screen.getByRole('listitem');
    const btn = within(item).getByRole('button');

    await user.click(btn);

    expect(action).not.toHaveBeenCalled();
  });
});

type RenderListProps = {
  delay?: number;
  success?: boolean;
  todos?: Todo[];
};

function renderList({
  delay = 0,
  success = true,
  todos = mockTodos,
}: RenderListProps = {}) {
  const newTodos = [...todos];
  const actionSuccessResult = {
    success: true,
    todo: { id: 'id', description: 'desc', createdAt: 'createdAt' },
  };
  const actionErrorResult = {
    success: false,
    errors: ['falha ao apagar todo'],
  };
  const actionResult = success ? actionSuccessResult : actionErrorResult;
  const actionNoDelay = vi.fn().mockResolvedValue(actionResult);
  const actionDelayed = vi.fn().mockImplementation(async () => {
    await new Promise(r => setTimeout(r, delay));
    return actionResult;
  });
  const action = delay > 0 ? actionDelayed : actionNoDelay;

  const renderResult = render(<TodoList action={action} todos={newTodos} />);

  return { action, renderResult, todos: newTodos };
}
