let webpack = require('webpack');
let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    target: 'web',
    entry: {
        main: [
            './client.js'
        ],
        vendor: [
            'react', 'react-dom', 'react-intl', 'locale', 'react-hotkeys', 'react-list', 'react-responsive', 'react-custom-scrollbars', 'react-resize-aware', 'async', 'immutable', 'classnames', 'fluxible', 'fluxible-addons-react', 'fluxible-plugin-fetchr', 'fluxible-router', 'react-google-recaptcha', 'identicons-react', 'iso-639-1', 'lodash', 'cheerio', 'react-dnd', 'react-dnd-html5-backend', 'striptags', 'js-sha512', 'debug', 'md5', 'js-cookie', 'cookie', 'fumble', 'crypt'
        ]
    },
    output: {
        path: path.resolve('./build/js'),
        publicPath: '/public/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    cacheDirectory: true
                }
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    publicPath: '/public/css/'
                })
            },
            // Getting URLs for font files otherwise we get encoding errors in css-loader
            { test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'url-loader?limit=100000'}
        ]
    },
    devServer: {
        contentBase: './assets'
    },
    plugins: [
        // css files from the extract-text-plugin loader
        new ExtractTextPlugin({
            filename: '../css/vendor.bundle.css',
            disable: false,
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};
