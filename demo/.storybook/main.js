module.exports = {
  stories: ['../stories/*.stories.tsx'],
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
  core: {
    builder: 'webpack5'
  },
  addons: [
    {
      name: '@storybook/addon-essentials'
    }
  ]
};
