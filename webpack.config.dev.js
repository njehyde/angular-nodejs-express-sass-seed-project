var path = require('path');

var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = webpackMerge(commonConfig, {

    entry: [ './assets/app/main.ts', './assets/sass/main.scss' ],

    devtool: 'cheap-module-eval-source-map',

    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        publicPath: "/js/app/",
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {loader: 'awesome-typescript-loader', options: {
                        transpileOnly: true
                    }},
                    {loader: 'angular2-template-loader'},
                    {loader: 'angular-router-loader'}
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
                                minimize: false,
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
        new ExtractTextPlugin({ // define where to save the file
            filename: '../../stylesheets/[name].css',
            allChunks: true,
        })
    ]
});