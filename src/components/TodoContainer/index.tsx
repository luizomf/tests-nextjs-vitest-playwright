import { todoRepository } from '@/core/todo/repositories/default.repository';
import { TodoList } from '../TodoList';
import { deleteTodoAction } from '@/core/todo/actions/delete-todo.action';
import { TodoForm } from '../TodoForm';
import { createTodoAction } from '@/core/todo/actions/create-todo.action';

export async function TodoContainer() {
  const todos = await todoRepository.findAll();

  return (
    <div className='max-w-md mx-auto p-8'>
      <TodoList todos={todos} action={deleteTodoAction} />
      <TodoForm action={createTodoAction} />
    </div>
  );
}
