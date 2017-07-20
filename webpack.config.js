var webpack = require('webpack');

module.exports = {
    entry: {
        learn: './Demos/learn/test.jsx',
        autorunAsync: './autorunAsync/',
        atom: './atom/',
        bianxingjingang:"./Demos/变形金刚/test.jsx"
    },
    output: {
        path: "./compress/",
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /(\.jsx?$|\.js?$)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'
            }
        ]
    },
    plugins: []
};
