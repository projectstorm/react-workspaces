module.exports = {
  stories: ['../dist/stories/*.stories.js'],
  webpackFinal: async (config, { configType }) => {
    return {
      ...config,
      devtool: 'inline-source-map',
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
  addons: [
    {
      name: '@storybook/addon-essentials'
    }
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: false
  }
};
