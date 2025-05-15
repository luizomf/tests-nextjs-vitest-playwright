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
