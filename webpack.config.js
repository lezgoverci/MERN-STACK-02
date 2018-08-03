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
                exclude: '/node_modules',
                use :{
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugin : [
        new HtmlWebpackPlugin({
            template: './static/index.html'
        })
    ]
}