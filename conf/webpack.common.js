const webpack = require('webpack');
const path = require('path');

const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const appSrc = path.resolve(__dirname, '../src/app');
const appBuild = path.resolve(__dirname, '../dist');

module.exports = {
    entry: {
        app: './src/app/app.js',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    module: {
        rules: [{
            exclude: [
                /\.html$/,
                /\.(js|jsx)$/,
                /\.(scss|css)$/,
                /\.json$/,
                /\.svg$/,
            ],
            loader: 'url-loader',
            options: {
                limit: '10000',
                name: 'static/media/[name].[hash:8].[ext]',
            },
        }, {
            test: /\.js$/,
            include: appSrc,
            use: [{
                loader: 'babel-loader',
            }],
        }, {
            test: /\.(scss|css)$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            autoprefixer,
                        ],
                        sourceMap: 'inline',
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    },
                }],
            }),
        }, {
            test: /\.svg$/,
            loader: 'file-loader',
            options: {
                name: 'static/media/[name].[hash:8].[ext]',
            },
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true, // TODO: CHECK!!!
            template: path.join(__dirname, '../src/index.html'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app'],
        }),
    ],
    performance: {
        hints: false,
    },
    devServer: {
        port: 8080,
        host: '0.0.0.0',
        contentBase: appBuild,
        noInfo: false,
        stats: 'minimal',
        historyApiFallback: true,
    },
};
