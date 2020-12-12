const path = require('path');
const { mainModule } = require('process');

const config = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 3040,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
}

module.exports = config;