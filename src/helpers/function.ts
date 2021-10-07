export function foreach(array: any[], callback: any) {
    try {
        for (let i = 0; i < array.length; i++) {
            callback(array[i]);
        }
    } catch (ex) {
        throw ex;
    }
}

export async function asyncForeach(array: any[], callback: any) {
    try {
        for (let i = 0; i < array.length; i++) {
            await callback(array[i]);
        }
    } catch (ex) {
        throw ex;
    }
}

export async function asyncMap(array: any[], callback: any) {
    try {
        let newArr = Array(array.length);
        for (let i = 0; i < array.length; i++) {
            newArr[i] = await callback(array[i]);
        }
        return newArr;
    } catch (ex) {
        throw ex;
    }
}

export function chunks(array: any[], size: number) {
    return Array.from(new Array(Math.ceil(array.length / size)), (_, i) => array.slice(i * size, i * size + size));
}

export function removeEmptyOrNull(obj: any) {
    Object.keys(obj).forEach((k) => (obj[k] && typeof obj[k] === "object" && module.exports.removeEmptyOrNull(obj[k])) || (!obj[k] && delete obj[k]));
    return obj;
}

export function mergeDeep(target: any, source: any, isMergingArrays = false) {
    target = ((obj) => {
        let cloneObj;
        try {
            cloneObj = JSON.parse(JSON.stringify(obj));
        } catch (err) {
            // If the stringify fails due to circular reference, the merge defaults
            //   to a less-safe assignment that may still mutate elements in the target.
            // You can change this part to throw an error for a truly safe deep merge.
            cloneObj = Object.assign({}, obj);
        }
        return cloneObj;
    })(target);

    const isObject = (obj: any) => obj && typeof obj === "object";

    if (!isObject(target) || !isObject(source)) return source;

    Object.keys(source).forEach((key) => {
        const targetValue = target[key];
        const sourceValue = source[key];

        if (Array.isArray(targetValue) && Array.isArray(sourceValue))
            if (isMergingArrays) {
                target[key] = targetValue.map((x, i) => (sourceValue.length <= i ? x : module.exports.mergeDeep(x, sourceValue[i], isMergingArrays)));
                if (sourceValue.length > targetValue.length) target[key] = target[key].concat(sourceValue.slice(targetValue.length));
            } else {
                target[key] = targetValue.concat(sourceValue);
            }
        else if (isObject(targetValue) && isObject(sourceValue))
            target[key] = module.exports.mergeDeep(Object.assign({}, targetValue), sourceValue, isMergingArrays);
        else target[key] = sourceValue;
    });

    return target;
}
