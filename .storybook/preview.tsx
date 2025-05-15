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
