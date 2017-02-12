var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'app/index.js')
    ],
    output: {
        path: path.join(__dirname, '/public/build/'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'public/index.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': process.env.NODE_ENV
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
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
