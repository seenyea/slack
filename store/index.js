window.__store_cache__ = window.__store_cache__ || {};

export const add = (key, name, fn) => {
    __store_cache__[key] = __store_cache__[key] || {};
    __store_cache__[key][name] = __store_cache__[key][name] || fn;
}

export const envoke = (key, name, params) => {
    if(__store_cache__[key]){
        if(__store_cache__[key][name]){
            __store_cache__[key][name](params);
        }
    }
}

export const detory = (key) => {
    if(__store_cache__[key]){
        for(let name in __store_cache__[key]){
            __store_cache__[key][name] = null;
            delete __store_cache__[key][name];
        }
    }
    __store_cache__[key] = null;
}