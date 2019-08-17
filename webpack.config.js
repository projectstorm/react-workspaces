const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const production = process.env.NODE_ENV === 'production';

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
	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader"
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
