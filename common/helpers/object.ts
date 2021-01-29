export function objectToInstance(object, instance) {
    for (const key in object) {
        instance[key] = object[key];
    }
    return instance;
}

export function objectsToInstances(array, callback) {
    const instances = [];
    for (const object of array) {
        const instance = callback();
        for (const key in object) {
            instance[key] = object[key];
        }
        instances.push(instance);
    }
    return instances;
}

export function serialize(instance) {
    return JSON.parse(JSON.stringify(instance, (key, value) => {
        if (key[0] === '_') {
            return null;
        }
        return value;
    }));
}