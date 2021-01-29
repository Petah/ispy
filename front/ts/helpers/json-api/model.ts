import { JsonApiData, JsonApiModel, JsonApiAttributes, JsonApiRelationships, JsonApiMeta, JsonApiRelationshipData } from './types'

export interface ModelConstructor<T> {
    new(args: ModelConstructorArgs): T;
    isType(type: string): boolean;
}

export interface Cache {
    [key: string]: Model;
}

export interface ModelConstructorArgs<A = JsonApiAttributes> {
    id: string;
    type: string;
    attributes: A;
    relationships?: JsonApiRelationships;
    included?: JsonApiModel[];
    meta?: JsonApiMeta;
}

export type ParseGenerator = Generator<Model | Model[] | undefined>

export abstract class Model<A = JsonApiAttributes> {
    protected static type: string

    public id: string
    public type: string
    public attributes: A
    public relationships: JsonApiRelationships
    public included: JsonApiModel[]
    public meta: JsonApiMeta
    private parsedRelationships = false

    constructor(args: ModelConstructorArgs<A>) {
        this.id = args.id
        this.type = args.type || this.constructor.name
        this.attributes = args.attributes || {} as any
        this.relationships = args.relationships || {}
        this.included = args.included || []
        this.meta = args.meta || {}
    }

    public static newEmpty<T extends Model>(this: ModelConstructor<T>) {
        return new this({
            id: '',
            type: this.constructor.name,
            attributes: {},
            relationships: {},
            included: [],
            meta: {},
        })
    }

    public static isType(type: string): boolean {
        return true
    }

    public * parseRelationships(cache: Cache): ParseGenerator {
        // implement in child class
    }

    /**
     * Create an instance of the model from an included JSON API relationship
     */
    public static fromJsonApi<T extends Model>(this: ModelConstructor<T>, jsonApiModel: JsonApiModel, jsonApiData: JsonApiData) {
        return new this({
            id: jsonApiModel.id,
            type: jsonApiModel.type,
            attributes: jsonApiModel.attributes,
            relationships: jsonApiModel.relationships,
            included: jsonApiData.included,
            meta: jsonApiData.meta,
        })
    }

    /**
     * Takes a JSON API response and returns a single model from the data field
     */
    public static mapModel<T extends Model>(this: ModelConstructor<T>, response: JsonApiData<JsonApiModel>): T {
        Model.checkResponse(response, false)
        const instance = new this({
            id: response.data.id,
            type: response.data.type,
            attributes: response.data.attributes,
            relationships: response.data.relationships,
            included: response.included,
            meta: response.meta,
        })
        Model.processRelationships([instance])
        return instance
    }

    /**
     * Takes a JSON API response and returns multiple models from the data field array
     */
    public static mapModels<T extends Model>(this: ModelConstructor<T>, response: JsonApiData): T[] {
        Model.checkResponse(response, true)
        const data: JsonApiModel[] = Array.isArray(response.data) ? response.data : [response.data]
        const result: T[] = []
        for (const d of data) {
            result.push(new this({
                id: d.id,
                type: d.type,
                attributes: d.attributes,
                relationships: d.relationships,
                included: response.included,
                meta: response.meta,
            }))
        }
        Model.processRelationships(Array.from(result))
        return result
    }

    private static checkResponse(response: any, expectsMultiple: boolean): void {
        if (!response) {
            throw new Error('Tried to map a model to a null response')
        }
        if (typeof response === 'string') {
            throw new Error('Tried to map a model to a string response, is there a error in the response? ' + response)
        }
        if (Promise.resolve(response) === response) {
            throw new Error('Tried to map a model to a promise, did you forget to await?')
        }
        if (expectsMultiple && !Array.isArray(response.data)) {
            throw new Error('Tried to map multiple models to a single model')
        }
        if (!expectsMultiple && Array.isArray(response.data)) {
            throw new Error('Tried to map a single model to a multiple models')
        }
    }

    private static processRelationships(pendingRelationshipParse: Model[]) {
        const cache: Cache = {}
        while (pendingRelationshipParse.length > 0) {
            const next = pendingRelationshipParse.pop()
            if (!next) {
                continue
            }
            if (next.parsedRelationships) {
                continue
            }
            cache[`${next.type}:${next.id}`] = next
            for (const relationships of next.parseRelationships(cache)) {
                if (!relationships) {
                    continue
                } else if (Array.isArray(relationships)) {
                    for (const relationship of relationships) {
                        cache[`${relationship.type}:${relationship.id}`] = relationship
                        pendingRelationshipParse.push(relationship)
                    }
                } else {
                    cache[`${relationships.type}:${relationships.id}`] = relationships
                    pendingRelationshipParse.push(relationships)
                }
            }
            next.parsedRelationships = true
        }
    }

    protected findRelated<T>(relationshipNames: string | string[], ImplementedModel: ModelConstructor<T>, cache: Cache): T | undefined {
        if (!Array.isArray(relationshipNames)) {
            relationshipNames = [relationshipNames]
        }
        for (const relationshipName of relationshipNames) {
            if (!this.included || !this.relationships[relationshipName] || !this.relationships[relationshipName].data) {
                continue
            }
            const relationshipData = this.relationships[relationshipName]?.data as JsonApiRelationshipData;
            if (!relationshipData?.id) {
                continue
            }
            const relatedModel = this.included.find((included) => {
                // tslint:disable-next-line:triple-equals Loose compare because of mixed strings/ints
                return included.id === relationshipData.id && ImplementedModel.isType(included.type.toLowerCase())
            })
            if (!relatedModel) {
                continue
            }
            if (cache[`${relatedModel.type}:${relatedModel.id}`]) {
                return cache[`${relatedModel.type}:${relatedModel.id}`] as any
            }
            return new ImplementedModel({
                id: relatedModel.id,
                type: relatedModel.type,
                attributes: relatedModel.attributes,
                relationships: relatedModel.relationships,
                included: this.included,
                meta: this.meta,
            })
        }
    }

    protected findAllRelated<T>(relationshipNames: string | string[], ImplementedModel: ModelConstructor<T>, cache: Cache): T[] {
        if (!this.included || !this.relationships) {
            return []
        }
        if (!Array.isArray(relationshipNames)) {
            relationshipNames = [relationshipNames]
        }
        for (const relationshipName of relationshipNames) {
            if (!this.relationships[relationshipName]) {
                continue
            }
            const relationshipData = this.relationships[relationshipName]?.data as JsonApiRelationshipData[];
            if (!relationshipData?.length) {
                continue
            }
            const relatedIds = relationshipData.map(r => r.id.toString())
            return this.included.filter((included) => {
                return ImplementedModel.isType(included.type.toLowerCase()) && relatedIds.indexOf(included.id.toString()) >= 0
            }).map((data) => {
                if (cache[`${data.type}:${data.id}`]) {
                    return cache[`${data.type}:${data.id}`]
                }
                return new ImplementedModel({
                    id: data.id,
                    type: data.type,
                    attributes: data.attributes,
                    relationships: data.relationships,
                    included: this.included,
                    meta: this.meta,
                })
            }) as any
        }
        return []
    }

    public toJsonApi(): JsonApiData<JsonApiModel> {
        return {
            meta: {},
            data: {
                id: this.id,
                type: this.type,
                attributes: this.attributes,
                relationships: this.relationships,
            },
            included: [],
        }
    }
}
