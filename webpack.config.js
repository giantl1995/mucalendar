const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dir = src => path.join(__dirname, src);
const path = require('path');
module.exports = {
    entry: dir('./src/js/app.js'),
    output: {
        filename: 'js/app.js',
        path: dir('/dist')
    },
    devServer: {
        contentBase: dir('/dist'),
        compress: true,
        port: 9000
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' }

                ]
            }, {
                test: /\.scss$/,
                use: [{ loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }

                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: /(node_modules)/,
                loader: 'file-loader',
                options: {
                    outputPath: '/css/fonts/',
                    name: './[name].[ext]'
                }


            },

            {
                test: /\.png$/,
                exclude: /(node_modules)/,
                loader: 'file-loader',
                options: {
                    outputPath: '/css/img/',
                    name: './[name].[ext]'
                }


            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: dir('./src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        })


    ]

}