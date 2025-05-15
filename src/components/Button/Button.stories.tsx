import { Button } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Button,
  decorators: [
    Story => (
      <div className='max-w-screen-md mx-auto p-12 flex items-center justify-center'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Olá mundo',
    variant: 'default',
    size: 'lg',
  },
};

export const Danger: Story = {
  args: {
    children: 'Olá mundo',
    variant: 'danger',
    size: 'lg',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Olá mundo',
    variant: 'ghost',
    size: 'lg',
  },
};
