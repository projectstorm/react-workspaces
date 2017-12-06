var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

var plugins = [];

//do we minify it all
if(process.env.NODE_ENV === 'production'){
	console.log("creating production build");
	new CheckerPlugin(),
	plugins.push(new webpack.optimize.UglifyJsPlugin({
		mangle: {
			keep_fnames: true
		},
		compress: {
			keep_fnames: true,
			warnings: false,
		}
	}));
	plugins.push(new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
	}));
}

/**
 * @author Dylan Vorster
 */
module.exports = {
	entry: './src/main.ts',
	output: {
		filename: 'main.js',
		path: __dirname + '/dist',
		libraryTarget: 'umd',
		library: 'SRW'
	},
	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		"lodash": {
			commonjs: 'lodash',
			commonjs2: 'lodash',
			amd: '_',
			root: '_'
		}
	},
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
				loader: 'awesome-typescript-loader'
			},
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	devtool: process.env.NODE_ENV === 'production'?false:'cheap-module-source-map'
}
