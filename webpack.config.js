const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')	
const {CleanWebpackPlugin} = require('clean-webpack-plugin')





// Functions

const filename = ext => `[name].${ext}`;





module.exports = {
	entry: {
	    main: './src/index.js',
	    // indexSecondary: './src/index-secondary.js',
	},
	output: {
		filename: filename('js'),
		publicPath: 'dist/',
		path: path.resolve(__dirname, './dist'),
	},
	// optimization: {
	//     splitChunks: {
	//       chunks: 'all'
	//     }
	// },
	devServer: {
		overlay: true,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
		new CleanWebpackPlugin(),
		new webpack.ProvidePlugin({
		  $: 'jquery',
		  jQuery: 'jquery'
		})
	],
	module: {
		rules: [
			// JS
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						],
						plugins: [
							'@babel/plugin-proposal-class-properties',
						]
					},
				},
			},
			// FONTS
			{
		        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
		        loader: "file-loader",
		        options: {
		          name: "assets/fonts/[name].[ext]",
	              // outputPath: 'fonts/'
		        }
		    },
		    // CSS
			{
				test: /\.(s*)css$/,
				use: [
					'style-loader',
					 MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {sourceMap:true}
					}, {
						loader: 'postcss-loader',
						options: {sourceMap:true, config:{path: 'config/postcss.config.js'}}
					}, {
						loader: 'sass-loader',
						options: {sourceMap:true}
					},
				],
			},
		],
	},
};

