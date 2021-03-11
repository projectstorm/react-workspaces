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
	devtool: 'cheap-source-map',
	mode: production ? 'production' : 'development',
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					mangle: false
				}
			})
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	}
};
