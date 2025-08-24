const entry = "./client/src/index.js";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path")

module.exports = {
	entry,
	output: {
		path: path.resolve(__dirname, "../dist"),
		filename: "bundle.[contenthash].js",
		publicPath: "/",  // ✅ important for React Router
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				type: "asset/resource",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/src/index.html',
		}),
	],
}
