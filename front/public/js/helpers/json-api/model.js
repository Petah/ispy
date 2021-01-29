"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
class Model {
    constructor(args) {
        this.parsedRelationships = false;
        this.id = args.id;
        this.type = args.type || this.constructor.name;
        this.attributes = args.attributes || {};
        this.relationships = args.relationships || {};
        this.included = args.included || [];
        this.meta = args.meta || {};
    }
    static newEmpty() {
        return new this({
            id: '',
            type: this.constructor.name,
            attributes: {},
            relationships: {},
            included: [],
            meta: {},
        });
    }
    static isType(type) {
        return true;
    }
    *parseRelationships(cache) {
    }
    static fromJsonApi(jsonApiModel, jsonApiData) {
        return new this({
            id: jsonApiModel.id,
            type: jsonApiModel.type,
            attributes: jsonApiModel.attributes,
            relationships: jsonApiModel.relationships,
            included: jsonApiData.included,
            meta: jsonApiData.meta,
        });
    }
    static mapModel(response) {
        Model.checkResponse(response, false);
        const instance = new this({
            id: response.data.id,
            type: response.data.type,
            attributes: response.data.attributes,
            relationships: response.data.relationships,
            included: response.included,
            meta: response.meta,
        });
        Model.processRelationships([instance]);
        return instance;
    }
    static mapModels(response) {
        Model.checkResponse(response, true);
        const data = Array.isArray(response.data) ? response.data : [response.data];
        const result = [];
        for (const d of data) {
            result.push(new this({
                id: d.id,
                type: d.type,
                attributes: d.attributes,
                relationships: d.relationships,
                included: response.included,
                meta: response.meta,
            }));
        }
        Model.processRelationships(Array.from(result));
        return result;
    }
    static checkResponse(response, expectsMultiple) {
        if (!response) {
            throw new Error('Tried to map a model to a null response');
        }
        if (typeof response === 'string') {
            throw new Error('Tried to map a model to a string response, is there a error in the response? ' + response);
        }
        if (Promise.resolve(response) === response) {
            throw new Error('Tried to map a model to a promise, did you forget to await?');
        }
        if (expectsMultiple && !Array.isArray(response.data)) {
            throw new Error('Tried to map multiple models to a single model');
        }
        if (!expectsMultiple && Array.isArray(response.data)) {
            throw new Error('Tried to map a single model to a multiple models');
        }
    }
    static processRelationships(pendingRelationshipParse) {
        const cache = {};
        while (pendingRelationshipParse.length > 0) {
            const next = pendingRelationshipParse.pop();
            if (!next) {
                continue;
            }
            if (next.parsedRelationships) {
                continue;
            }
            cache[`${next.type}:${next.id}`] = next;
            for (const relationships of next.parseRelationships(cache)) {
                if (!relationships) {
                    continue;
                }
                else if (Array.isArray(relationships)) {
                    for (const relationship of relationships) {
                        cache[`${relationship.type}:${relationship.id}`] = relationship;
                        pendingRelationshipParse.push(relationship);
                    }
                }
                else {
                    cache[`${relationships.type}:${relationships.id}`] = relationships;
                    pendingRelationshipParse.push(relationships);
                }
            }
            next.parsedRelationships = true;
        }
    }
    findRelated(relationshipNames, ImplementedModel, cache) {
        if (!Array.isArray(relationshipNames)) {
            relationshipNames = [relationshipNames];
        }
        for (const relationshipName of relationshipNames) {
            if (!this.included || !this.relationships[relationshipName] || !this.relationships[relationshipName].data) {
                continue;
            }
            const relationshipData = this.relationships[relationshipName]?.data;
            if (!relationshipData?.id) {
                continue;
            }
            const relatedModel = this.included.find((included) => {
                return included.id === relationshipData.id && ImplementedModel.isType(included.type.toLowerCase());
            });
            if (!relatedModel) {
                continue;
            }
            if (cache[`${relatedModel.type}:${relatedModel.id}`]) {
                return cache[`${relatedModel.type}:${relatedModel.id}`];
            }
            return new ImplementedModel({
                id: relatedModel.id,
                type: relatedModel.type,
                attributes: relatedModel.attributes,
                relationships: relatedModel.relationships,
                included: this.included,
                meta: this.meta,
            });
        }
    }
    findAllRelated(relationshipNames, ImplementedModel, cache) {
        if (!this.included || !this.relationships) {
            return [];
        }
        if (!Array.isArray(relationshipNames)) {
            relationshipNames = [relationshipNames];
        }
        for (const relationshipName of relationshipNames) {
            if (!this.relationships[relationshipName]) {
                continue;
            }
            const relationshipData = this.relationships[relationshipName]?.data;
            if (!relationshipData?.length) {
                continue;
            }
            const relatedIds = relationshipData.map(r => r.id.toString());
            return this.included.filter((included) => {
                return ImplementedModel.isType(included.type.toLowerCase()) && relatedIds.indexOf(included.id.toString()) >= 0;
            }).map((data) => {
                if (cache[`${data.type}:${data.id}`]) {
                    return cache[`${data.type}:${data.id}`];
                }
                return new ImplementedModel({
                    id: data.id,
                    type: data.type,
                    attributes: data.attributes,
                    relationships: data.relationships,
                    included: this.included,
                    meta: this.meta,
                });
            });
        }
        return [];
    }
    toJsonApi() {
        return {
            meta: {},
            data: {
                id: this.id,
                type: this.type,
                attributes: this.attributes,
                relationships: this.relationships,
            },
            included: [],
        };
    }
}
exports.Model = Model;
