'use client';
import { DeleteTodoAction } from '@/core/todo/actions/todo.action.types';
import { Todo } from '@/core/todo/schemas/todo.contract';
import { sanitizeStr } from '@/utils/sanitize-str';
import clsx from 'clsx';
import { CircleXIcon } from 'lucide-react';
import { useId, useTransition } from 'react';

export type TodoListProps = {
  todos?: Todo[];
  action: DeleteTodoAction;
};

export function TodoList({ action, todos = [] }: TodoListProps) {
  const id = useId();
  const headingId = `heading-${id}`;
  const [pending, startTransition] = useTransition();

  function handleTodoDelete(id: string) {
    const cleanId = sanitizeStr(id);
    if (!cleanId) return;

    startTransition(async () => {
      const result = await action(cleanId);

      if (!result.success) {
        alert(result.errors[0]);
      }
    });
  }
  return (
    <div>
      <h1
        className='mb-8 text-3xl/normal font-extrabold text-center'
        id={headingId}
      >
        Lista de tarefas
      </h1>

      <TodoListItems
        handleTodoDelete={handleTodoDelete}
        headingId={headingId}
        pending={pending}
        todos={todos}
      />
    </div>
  );
}

type TodoListItemsProps = {
  todos?: Todo[];
  pending?: boolean;
  headingId: string;
  handleTodoDelete: (id: string) => void;
};

function TodoListItems({
  todos,
  pending,
  headingId,
  handleTodoDelete,
}: TodoListItemsProps) {
  const hasTodos = Array.isArray(todos) && todos.length > 0;

  if (!hasTodos) return null;

  const todoItemClasses = clsx(
    !pending && 'bg-amber-200 text-amber-900 hover:scale-105',
    pending && 'bg-gray-200 text-gray-900 hover:scale-100',
    'transition flex justify-between py-2 px-4 rounded-lg',
  );

  return (
    <ul className='mb-6 flex flex-col gap-2' aria-labelledby={headingId}>
      {todos.map(todo => {
        return (
          <li className={todoItemClasses} key={todo.id}>
            <span>{todo.description}</span>

            <button
              className={clsx(
                'cursor-pointer disabled:cursor-not-allowed',
                'disabled:text-gray-500 hover:text-black',
              )}
              aria-label={`Apagar: ${todo.description}`}
              onClick={() => handleTodoDelete(todo.id)}
              disabled={pending}
            >
              <CircleXIcon size={18} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
