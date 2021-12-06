const path = require('path');
module.exports = {
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    proxy: {
        '/api/getsocketinfo': {
            target: 'http://localhost:3000'
        },
        '/api/getpraiselists': {
            target: 'http://localhost:3000'
        }
    },
}