const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : './src/App.jsx',
    output: {
        path : path.join(__dirname, '/static'),
        filename : 'App.bundle.js'
    },
    module : {
        rules : [
            {
                test: /\.jsx?$/,
                exclude: '/node_modules',
                use :{
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: true
        })
    ]
}