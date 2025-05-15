import { Button } from '.';
import { HandMetalIcon, StarIcon, SmileIcon } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

const iconMap = {
  none: null,
  hand: <HandMetalIcon />,
  star: <StarIcon />,
  smile: <SmileIcon />,
};

// Esse tipo estende o tipo do Button para adicionar propriedades
// exclusivas para o Story, como "icon", por exemplo.
type ButtonStoryProps = React.ComponentProps<typeof Button> & {
  icon?: keyof typeof iconMap;
};

// Usando ButtonStoryProps porque icon não existe no botão
const meta: Meta<ButtonStoryProps> = {
  title: 'Components/Forms/Button',
  component: Button,
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ['none', 'hand', 'star', 'smile'],
      description: 'Ícone opcional exibido à esquerda do texto',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'none' },
      },
    },
    children: {
      control: 'text',
    },
    variant: {
      name: 'Variações',
      options: ['default', 'ghost', 'danger'],
      control: { type: 'select' },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
  decorators: [
    Story => (
      <div className='max-w-screen-lg mx-auto p-12'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

// Usando ButtonStoryProps porque icon não existe no botão

type Story = StoryObj<ButtonStoryProps>;

const render = ({ icon, children, ...args }: ButtonStoryProps) => (
  <Button {...args}>
    <>
      {icon !== 'none' && iconMap[icon as keyof typeof iconMap]}{' '}
      <span>{children}</span>
    </>
  </Button>
);

export const Playground: Story = {
  args: {
    children: 'Texto do botão',
    icon: 'hand',
  },
  render,
};

export const Large: Story = {
  args: {
    ...Playground.args,
    children: 'Click me',
    icon: 'star',
    size: 'lg',
  },
  render: ({ icon, children, ...args }: ButtonStoryProps) => (
    <div className='flex gap-6  flex-wrap'>
      <Button {...args} className='flex-1'>
        <>
          {icon !== 'none' && iconMap[icon as keyof typeof iconMap]}{' '}
          <span>{children}</span>
        </>
      </Button>

      <Button variant='ghost' {...args} className='flex-1'>
        <>
          {iconMap['hand']}
          <span>{children}</span>
        </>
      </Button>

      <Button variant='danger' {...args} className='flex-1'>
        <>
          {iconMap['smile']}
          <span>{children}</span>
        </>
      </Button>

      <Button variant='default' {...args} className='flex-1'>
        Submit
      </Button>
    </div>
  ),
};
