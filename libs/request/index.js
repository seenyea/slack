import request from 'umi-request';
import { logError, logInfo } from '@libs/trace';
import { fail } from '@components/notice'
/**
 * 通用请求接口
 * @param {string} url 
 * @param {Object} option - 详情可见https://github.com/umijs/umi-request#request-options
 */
export const hgRequest = (url, option) => {
    const logObj = {
        url,
        option,
        message: 'ok',
        code: 200,
        data: null
    };
    try {
        return new Promise((resolve, reject) => {
            request(url, option).then(d => {
                logObj.data = d;
                logObj.code = d.code;
                if (d && d.code === 0) {
                    logInfo(logObj);
                    resolve(d.data || null);
                } else {
                    logObj.message = '数据有问题';
                    fail('数据有问题');
                    logError(logObj);
                    reject(logObj);
                }
            });
        })
    } catch (e) {
        return new Promise((resolve, reject) => {
            logObj.data = e;
            logObj.code = 600;
            logObj.message = '代码执行报错';
            fail('代码执行报错');
            logError(logObj);
            reject(logObj);
        })
    }
}

