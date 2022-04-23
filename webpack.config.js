const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: `./client/index.js`,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {   test: /\.jsx?/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        exclude: [
                        /node_modules[\\\/]core-js/,
                        /node_modules[\\\/]webpack[\\\/]buildin/],
                        presets: ['@babel/preset-env', `@babel/preset-react`],
                    }
                },
            }, {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ]
              },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'index.html',
        title: 'development',
      })],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
            publicPath: '/build',
        },
        // compress: true,
        port: 8080,
        proxy: {
            '/api': 'http://localhost:3000',
        }
    },
};