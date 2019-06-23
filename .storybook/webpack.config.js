const path = require('path');
module.exports = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"],
				include: path.resolve(__dirname, '../')
			},
			{
				test: /\.css/,
				loaders: ["style-loader", "css-loader"],
				include: path.resolve(__dirname, '../')
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: "source-map-loader",
				exclude: [
					/node_modules\//
				]
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				loader: "file-loader"
			}
		]
	},
	resolve: {
		extensions: [".js",".tsx", ".ts"]
	}
};
