const path = require('path');
const nodeExternals = require('webpack-node-externals');
const production = process.env.NODE_ENV === 'production';
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (directory) => {
  const packageFile = require(path.join(directory, 'package.json'));
  return {
    entry: path.join(directory, 'dist/index.jsx'),
    output: {
      filename: 'index.umd.js',
      path: path.join(directory, 'dist'),
      library: {
        name: packageFile.name,
        type: 'umd'
      }
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }], '@babel/preset-react']
            }
          }
        }
      ]
    },
    externalsPresets: { node: true },
    devtool: production ? 'source-map' : 'cheap-module-source-map',
    mode: production ? 'production' : 'development',
    optimization: {
      minimizer: [new TerserPlugin()]
    },
    externals: [
      nodeExternals({ modulesDir: path.join(directory, 'node_modules') }),
      nodeExternals({ modulesDir: path.join(__dirname, 'node_modules') })
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
};
