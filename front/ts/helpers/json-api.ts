export class JsonApi {
    static parseEntity(entity, included) {
        const result: any = {};
        result.id = entity.id;
        result.type = entity.type;
        for (const key in entity.attributes) {
            result[key] = entity.attributes[key];
        }
        for (const key in entity.relationships) {
            if (Array.isArray(entity.relationships[key].data)) {
                result[key] = entity.relationships[key].data.map((r) => {
                    return this.parseEntity(included.find((i) => {
                        return i.id === r.id && i.type === r.type;
                    }), included);
                });
            } else {
                result[key] = this.parseEntity(included.find((i) => {
                    return i.id === entity.relationships[key].data.id && i.type === entity.relationships[key].data.type;
                }), included);
            }
        }
        return result;
    }

    static parseSingle(jsonApiStructure) {
        return this.parseEntity(jsonApiStructure.data, jsonApiStructure.included)
    }

    static parseMultiple(jsonApiStructure) {
        const result = [];
        for (const d of jsonApiStructure.data) {
            result.push(this.parseEntity(d, jsonApiStructure.included));
        }
        return result;
    }
}