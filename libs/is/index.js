const toString = Object.prototype.toString;
const typeStr = o => toString.call(o);

const ArrayType = typeStr([]);
const ObjectType = typeStr({});
const FunctionType = typeStr(Function);

const StringType = typeStr('');
const NumberType = typeStr(0);
const BooleanType = typeStr(true);
const UndefinedType = typeStr(undefined);
const NullType = typeStr(undefined);
const SymbolType = typeStr(Symbol(''));


export const isArray = o => {
     const type = typeStr(o);
     return type === ArrayType;
}

export const isObject = o => {
    const type = typeStr(o);
    return type === ObjectType;
}

export const isFunction = o => {
    const type = typeStr(o);
    return type === FunctionType;
}

export const isString = o => {
    const type = typeStr(o);
    return type === StringType;
} 

export const isNumber = o => {
    const type = typeStr(o);
    return type === NumberType && !isNaN(o);
}

export const isBoolean = o => {
    const type = typeStr(o);
    return type === BooleanType;
}

export const isUndefined = o => {
    const type = typeStr(o);
    return type === UndefinedType;
}

export const isNull = o => {
    const type = typeStr(o);
    return type === NullType;
}

export const isSymbol = o => {
    const type = typeStr(o);
    return type === SymbolType;
}