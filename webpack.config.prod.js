var path = require('path');

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
var ngw = require('@ngtools/webpack');

// importing plugins that do not come by default in webpack
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = webpackMerge.smart(commonConfig, {

    entry: [ './assets/app/main.aot.ts', './assets/sass/main.scss' ],

    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        filename: 'bundle.js',
        publicPath: '/js/app/',
        chunkFilename: '[id].[hash].chunk.js'
    },

    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            },
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    // 'angular-router-loader?aot=true'
                ]
            },
            { // regular css files
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                  loader: 'css-loader?importLoaders=1',
                }),
            },
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        }, 
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        new ngw.AngularCompilerPlugin({
            tsConfigPath: './tsconfig.aot.json',
            entryModule: './assets/app/app.module#AppModule'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        }),
        new ExtractTextPlugin({ // define where to save the file
            filename: '../../stylesheets/[name].css',
            allChunks: true
        })
    ]
});