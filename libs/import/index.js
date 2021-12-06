import { guid } from '@libs/utils/guid';

/**
 * 按照es6的模式加载异步的模块
 * @param {string} url 
 */
const importByModule = url => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const tempGlobal = "__tempModuleLoadingVariable" + Math.random().toString(32).substring(2);
      script.type = "module";
      script.textContent = `import * as m from "${url}"; window.${url} = m;`;
  
      script.onload = () => {
        resolve(window[url]);
        delete window[url];
        script.remove();
      };
  
      script.onerror = () => {
        reject(new Error("Failed to load module script with URL " + url));
        delete window[tempGlobal];
        script.remove();
      };
  
      document.documentElement.appendChild(script);
    });
}

export const SUCCESS = "done";
export const FAILURE = "error";

const _cache_key_ = guid();
window[_cache_key_] = window[_cache_key_] || {};
const cacheMaps = window[_cache_key_];

const success = {code: SUCCESS};
const failure = {code: FAILURE, url: ""};

/**
 * 按照es5的模式来加载异步模块
 * @param {string} url 
 */
export const importExternalScript = url => {
    return new Promise((resolve, reject) => {

        if(cacheMaps[url]){
            resolve(success);
        }else{
            const script = document.createElement("script");
            script.type= 'text/javascript';
            script.src= url;
            
            script.onload = () => {
                cacheMaps[url] = true;
                resolve(success);
                script.onload = null;
                script.onerror = null;
                script.remove();
            };

            script.onerror = () => {
                failure.url = ur;
                resolve(failure);
                script.onload = null;
                script.onerror = null;
                script.remove();
            };

            document.documentElement.appendChild(script);
        }
    });
}