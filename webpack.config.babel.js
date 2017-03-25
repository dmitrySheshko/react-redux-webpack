'use strict';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

let htmlWebpackPluginConf = {
    template: __dirname + '/dev/index.html',
    inject: 'body'
};

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {

    context: __dirname + '/dev',

    entry: {
        main: './main',
        //vendor: ['react', 'redux', 'react-redux', 'react-router-dom', 'react-dom', 'redux-thunk', 'lodash']
        style: './static/styles/main'
    },

    output: {
        path: __dirname + '/public/',
        filename: 'js/[name].js',
        publicPath: '/'
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.scss']
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use:[{
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: ['es2015', 'react', 'stage-0']
                }
            }]
        }, {
            test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
            loader: "file-loader?name=styles/fonts/[name].[ext]"
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'resolve-url-loader'
                }, {
                    loader: 'sass-loader'
                }]
            })
        }]
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin(htmlWebpackPluginConf),
        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/vendor.js',
            children: true
        })*/
        new CopyWebpackPlugin([{
            from: __dirname + '/dev/static/images',
            to: __dirname + '/public/images'
        }]),
        new ExtractTextPlugin('styles/styles.css')
    ],

    watch: NODE_ENV === 'development',

    devtool: (NODE_ENV === 'development') ? 'inline-source-map' : false,

    devServer: {
        port: 8080,
        contentBase: __dirname + '/public'
    }
};

if(NODE_ENV !== 'development'){
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            drop_console: true,
            warnings: false,
            unsafe: true
        }
    }));
}