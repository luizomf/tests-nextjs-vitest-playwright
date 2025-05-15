import { InputText } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InputText> = {
  title: 'Components/Forms/InputText',
  component: InputText,
  decorators: [
    Story => (
      <div className='max-w-screen-lg mx-auto p-12'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'tel', 'url', 'search'],
      description: 'Esse é o tipo do input',
    },
    labelText: {
      control: 'text',
      description: 'O label do input',
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro ao usuário',
    },
    placeholder: {
      control: 'text',
      description: 'Um exemplo de uso para o input',
    },
    required: {
      control: 'boolean',
      description: 'O campo é requerido',
    },
    disabled: {
      control: 'boolean',
      description: 'Campo está desativado',
    },
    readOnly: {
      control: 'boolean',
      description: 'Apenas leitura',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    type: 'text',
    labelText: 'Input Label',
    errorMessage: '',
    placeholder: 'Digite algo...',
    required: true,
    disabled: false,
    readOnly: false,
    defaultValue: 'Este é o valor padrão do input',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    errorMessage: 'Essa é a mensagem de erro',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
  },
};
