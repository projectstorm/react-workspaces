const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const production = process.env.NODE_ENV === "production";

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
		library: 'storm-react-forms'
	},
	externals: [nodeExternals()],
	plugins:plugins,
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	devtool: production ? "source-map" : "cheap-module-source-map",
	mode: production ? "production" : "development",
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: false,
					ecma: 5,
					mangle: false
				},
				sourceMap: true
			})
		]
	}
};
