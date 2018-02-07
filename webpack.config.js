module.exports = {
	entry: './src/app.js',
	output: {
		path: __dirname,
		filename: 'dist/bundle.js',
		publicPath: '/dist/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['env', 'react']
				}
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['env', 'react']
				}
			}
		]
	},
	stats: {
		colors: true
	},
	devServer: {
		publicPath: '/dist/',
		overlay: true,
		historyApiFallback: {
			rewrites: [
				// This makes it so going directly to a route actually works
				{ from: /./, to: '/dist/index.html'},
			]
		}
	}
};