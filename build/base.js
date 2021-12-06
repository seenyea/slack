const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CpWebpackPlugin = require('cp-webpack-plugin');

const projectName = `Slack`;   //项目名称

module.exports = {
    entry: {
        "depes": ["react", "react-dom"],
        "app": path.resolve(__dirname, '../src/index.js'), // 入口文件,
    },
    output: {
        filename: '[name][hash].js',
        path: path.resolve(__dirname, '../dist/')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader?cacheDirectory',// 缓存每次的解析结果 加载更快
                    options: {
                        presets: [
                            '@babel/preset-env', '@babel/preset-react'
                        ],
                        plugins: [
                            ["import", {
                                "libraryName": "antd",
                                "libraryDirectory": "es",
                                "style": "css"
                            }],
                            "react-hot-loader/babel",
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            },
            {
                test: /\.(css|less)$/i,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /\.m\.css$/i
            },
            {
                test: /.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }
                ],
                include: /\.m\.css$/i
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        publicPath: './',
                        limit: 4 * 1024,
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),//查找模板文件
            title: projectName
        }),
        new CleanWebpackPlugin(),   //清空dist目录下的文件
        new CpWebpackPlugin({
            from: path.resolve(__dirname, '../static'),
            to: path.resolve(__dirname, '../dist/static'),
        })
    ],
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, '../src/'),
            "@static": path.resolve(__dirname, '../static/css/'),
            "@libs": path.resolve(__dirname, '../libs'),
            "@store": path.resolve(__dirname, '../store'),
            "@components": path.resolve(__dirname, '../components')
        }
    }
}
