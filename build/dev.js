const base = require('./base');
const port = 9000;  //默认服务端口
const { proxy } = require('../devconfig/apiproxy');
const mockData = require('../devconfig/mockdata');
var fs = require('fs'); //文件模块

base.mode = 'development';
module.exports = {
    ...base,
    devtool: 'cheap-module-source-map',
    devServer: {
        setup (app) {
            Object.keys(mockData).forEach(key => {
                app.get(key, function (req, res) {
                    const filePath = mockData[key];
                    console.log('filePath => ', filePath);
                    //读取json文件
                    fs.readFile(filePath, 'utf-8', function(err, data) {
                        if (err) {
                            res.send('文件读取失败');
                        } else {
                            res.send(data);
                        }
                    });
                });
            });
        },
        historyApiFallback: true,
        compress: true, //是否启用gzip压缩
        port, //提供访问的端口
        proxy  //api代理配置
    },
}
