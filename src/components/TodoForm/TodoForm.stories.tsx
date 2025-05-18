import { CreateTodoAction } from '@/core/todo/actions/todo.action.types';
import { TodoForm } from '.';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta: Meta<typeof TodoForm> = {
  title: 'Components/Forms/TodoForm',
  component: TodoForm,
  decorators: [
    Story => (
      <div className='max-w-screen-md mx-auto p-12'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    action: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TodoForm>;

export const Default: Story = {
  args: {
    action: fn(async () => {
      return {
        success: true,
        todo: { id: 'id', description: 'desc', createdAt: 'data' },
      };
    }) as CreateTodoAction,
  },
};

export const WithError: Story = {
  args: {
    action: fn(async () => {
      return {
        success: false,
        errors: ['falha ao criar todo'],
      };
    }) as CreateTodoAction,
  },
};
