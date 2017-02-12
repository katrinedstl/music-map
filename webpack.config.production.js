var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'app/index.js'),
    output: {
        path: path.join(__dirname, '/public/build/'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            title: 'Music Map',
            template: 'index.html',
        }),
    ],
    module: {
        loaders: [
              {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
              },
              {
                  test: /\.scss$/,
                  loaders: ["style", "css", "sass"]
              }
          ]
        } 
};