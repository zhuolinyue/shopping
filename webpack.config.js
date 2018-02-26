const  path                = require('path');
const  webpack             = require('webpack')
const ExtractTextPlugin   = require("extract-text-webpack-plugin");
const  HtmlWebpackPlugin   = require('html-webpack-plugin');
module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
        publicPath: "/dist/"
    },
    resolve: {
        alias: {
            utils       :   path.resolve(__dirname,'./src/utils'),
            page        :  path.resolve(__dirname,'./src/page'),
            component   :  path.resolve(__dirname,'./src/component'),
            service         :  path.resolve(__dirname,'./src/service'),

        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env","react"],
                        "plugins": [
                            "transform-class-properties",
                            "transform-decorators-legacy"
                        ]

                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name:'resource/[name].[ext]'
                        }
                    }
                ]
            },
            {
               test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name:'resource/[name].[ext]'
                        }
                    }
                ]
           }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon   : 'favicon.ico',
            template  : './src/index.html'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name     :  'common',
            filename :  'js/base.js'
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    devServer: {
        contentBase  : path.join(__dirname, "dist"),
        port          : 8097,
        historyApiFallback:{
            index:  '/dist/index.html'
        },
        proxy : {
            '/manage' : {
                target       : 'http://admintest.happymmall.com',
                changeOrigin : true
            },
            '/user/logout.do' : {
                target       : 'http://admintest.happymmall.com',
                changeOrigin : true
            }
        }
    }
};
