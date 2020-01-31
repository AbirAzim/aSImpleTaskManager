const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
    entry: './src/index.js',
    output: {

        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/dist'

    },

    mode: 'development',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({ filename: 'style.css' })
    ]
}

module.exports = config;