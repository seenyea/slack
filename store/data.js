window.__data_cache__ = window.__data_cache__ || {};

export const addData = (key, value) => {
    __data_cache__[key] = value;
}

export const updateData = (key, name, value) => {
    if(__data_cache__[key]){
        if(name){
            __data_cache__[key][name] = value;
        }else{
            __data_cache__[key] = value;
        }
    }
}

export const getData = (key, name) => {
    if(__data_cache__[key]){
        if(name){
            if(__data_cache__[key][name]){
                return __data_cache__[key][name];
            }
        }
        return __data_cache__[key];
    }
    return null;
}

export const detoryData = (key) => {
    if(__data_cache__[key]){
        for(let name in __data_cache__[key]){
            __data_cache__[key][name] = null;
            delete __data_cache__[key][name];
        }
    }
    __data_cache__[key] = null;
}