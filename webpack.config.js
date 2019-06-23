const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const production = process.env.NODE_ENV === 'production';

var plugins = [];

if(production){
	console.log("creating production build");
	plugins.push(new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
	}));
}

module.exports = {
	entry: './src/main.ts',
	output: {
		filename: 'main.js',
		path: __dirname + '/dist',
		libraryTarget: 'umd',
		library: 'SRW'
	},
	externals: [
		nodeExternals(),
	],
	plugins:plugins,
	module: {
		rules: [
			{
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
		]
	},
	devtool: production ? 'source-map' : 'cheap-module-source-map',
	mode: production ? 'production' : 'development',
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					safari10: true,
					ecma: 6
				}
			})
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	}
};
