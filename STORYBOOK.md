# Seção Bônus: Storybook

Essa seção mostra como usar o **Storybook 8.x** com Next.js, Tailwind e
componentes React. O foco aqui é ensinar o **mínimo necessário para visualizar
componentes isolados** em um ambiente controlado.

> ⚠️ Este curso usa o Storybook **v8.x**. Se você quiser usar versões mais
> recentes, consulte a
> [documentação oficial](https://storybook.js.org/docs/react/get-started/install)
> e adapte conforme necessário.

---

## 🎯 Objetivo

- Rodar o Storybook com Tailwind.
- Visualizar componentes interativos.
- Brincar com `args` e `controls`.
- Nada de addons inúteis ou configurações mágicas.

---

## 📦 Instalação

Instale os pacotes com:

```bash
npm install -D @storybook/react@8.x @storybook/nextjs@8.x @storybook/addon-essentials@8.x storybook@8.x @storybook/test@8.x --upgrade
```

---

## 🛠️ Configuração

### `.storybook/main.ts`

```ts
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/nextjs',
  staticDirs: ['../public'],
  features: {
    backgroundsStoryGlobals: false,
  },
};
export default config;
```

---

### `.storybook/preview.tsx`

```tsx
import React from 'react';
import type { Preview } from '@storybook/react';

import '../src/app/globals.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        // { name: 'dark', value: '#000000' },
        { name: 'light', value: 'ffffff' },
      ],
      default: 'light',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [Story => <Story />],
};

export default preview;
```

---

### `.storybook/storybook.css`

```css
html,
body,
#root,
#storybook-root {
  height: 100%;
  padding: 0 !important;
  margin: 0;
}

body {
  background-color: white;
}
```

---

## 🧪 Exemplo de componente

### `src/components/Button/index.tsx`

```tsx
import clsx from 'clsx';

type ButtonVariants = 'default' | 'ghost' | 'danger';
type ButtonSizes = 'sm' | 'md' | 'lg';

type ButtonProps = {
  variant?: ButtonVariants;
  size?: ButtonSizes;
} & React.ComponentProps<'button'>;

export function Button({
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx('bg-blue-600 hover:bg-blue-700 text-blue-100'),
    ghost: clsx('bg-slate-300 hover:bg-slate-400 text-slate-950'),
    danger: clsx('bg-red-600 hover:bg-red-700 text-red-100'),
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx(
      'text-xs/tight',
      'py-1',
      'px-2',
      'rounded-sm',
      '[&_svg]:w-3 [&_svg]:h-3 gap-1',
    ),
    md: clsx(
      'text-base/tight',
      'py-2',
      'px-4',
      'rounded-md',
      '[&_svg]:w-4 [&_svg]:h-4 gap-2',
    ),
    lg: clsx(
      'text-lg/tight',
      'py-4',
      'px-6',
      'rounded-lg',
      '[&_svg]:w-5 [&_svg]:h-5 gap-3',
    ),
  };

  const buttonClasses = clsx(
    buttonVariants[variant],
    buttonSizes[size],
    'flex items-center justify-center cursor-pointer',
    'transition',
    'disabled:bg-slate-200',
    'disabled:text-slate-400',
    'disabled:cursor-not-allowed',
    props.className,
  );

  return (
    <button {...props} className={buttonClasses} />
  );
}
```

### `src/components/Button/Button.stories.tsx`

```tsx
import { Button } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: 'Texto do botão',
  },
};
```

---

## 🚀 Scripts disponíveis

```json
"scripts": {
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

---

## ✅ Considerações

- Tailwind funciona normalmente com `globals.css`.
- `h-full` só funciona porque estilizamos o HTML/body no `storybook.css`.
- Evitamos addons inúteis e focamos só no que interessa: **ver o componente
  renderizado**.
- Dá pra usar `args`, `argTypes` e `decorators` sem complicar.
