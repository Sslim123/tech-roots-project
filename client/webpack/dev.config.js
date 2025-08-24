const { merge } = require("webpack-merge");
const common = require("./common.config.js");
const path = require('path');


module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		static: {
			directory: path.resolve(__dirname, '../dist'),
		},
		historyApiFallback: true,
		hot: true,
		open: true,
		port: 3000,
		proxy: [{
			context: ['/api'],
			target: 'http://localhost:3000'
		}],
	},
});

