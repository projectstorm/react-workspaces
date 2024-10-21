import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  addons: [
    {
      name: '@storybook/addon-essentials'
    },
    {
      name: '@storybook/addon-webpack5-compiler-babel'
    }
  ],
  docs: {
    autodocs: false
  },
  stories: ['../dist/stories/*.stories.js'],
  webpackFinal: async (config, { configType }) => {
    return {
      ...config,
      devtool: 'inline-source-map',
      resolve: {
        ...config.resolve,
        alias: {
          '@emotion/react': require.resolve('@emotion/react')
        }
      },
      module: {
        ...config.module,
        rules: [
          {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader'
          },
          ...config.module.rules
        ]
      }
    };
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  }
};

export default config;
