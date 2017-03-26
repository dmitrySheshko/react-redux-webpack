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
    //test loader
    resolveLoader: {
        modules: ['node_modules', 'test']
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
            include: /node_modules/,
            loader: "file-loader?name=styles/fonts/[name].[ext]"
        }, {
            test: /\.png$/,
            include: __dirname + '/dev/static/images',
            loader: "file-loader?name=images/[name].[ext]"
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: NODE_ENV !== 'development'
                    }
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
                }, {
                    loader: 'test-loader',
                    options: {
                        subStr: /105px/g,
                        newSubStr: '200px',
                        regExpFlags: 'g'
                    }
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
            from: __dirname + '/dev/static/images/users',
            to: __dirname + '/public/images/users'
        }]),
        new ExtractTextPlugin('styles/styles.css')
    ],

    watch: NODE_ENV === 'development',

    devtool: (NODE_ENV === 'development') ? 'cheap-module-source-map' : false,

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