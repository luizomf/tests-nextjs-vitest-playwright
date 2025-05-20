import {
  CreateTodoAction,
  DeleteTodoAction,
} from '@/core/todo/actions/todo.action.types';
import { fn } from '@storybook/test';

export const todoActionStoryMock = {
  create: {
    success: fn(async () => {
      return {
        success: true,
        todo: { id: 'id', description: 'desc', createdAt: 'data' },
      };
    }) as CreateTodoAction,
    error: fn(async () => {
      return {
        success: false,
        errors: ['falha ao criar todo'],
      };
    }) as CreateTodoAction,
  },
  delete: {
    success: fn(async () => {
      return {
        success: true,
        todo: { id: 'id', description: 'desc', createdAt: 'data' },
      };
    }) as DeleteTodoAction,
    error: fn(async () => {
      return {
        success: false,
        errors: ['falha ao criar todo'],
      };
    }) as DeleteTodoAction,
    delayed: fn(async () => {
      await new Promise(r => setTimeout(r, 2000));
      return {
        success: true,
        todo: { id: 'id', description: 'desc', createdAt: 'data' },
      };
    }) as DeleteTodoAction,
  },
};
