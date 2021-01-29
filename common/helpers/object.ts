export function objectToInstance(object, instance) {
    for (const key in object) {
        instance[key] = object[key];
    }
    return instance;
}
