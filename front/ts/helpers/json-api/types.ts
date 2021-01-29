export interface JsonApiAttributes {
    [key: string]: any
}

export interface JsonApiData<T = JsonApiModel | JsonApiModel[]> {
    meta: JsonApiMeta
    data: T
    included: JsonApiModel[]
}

export interface JsonApiRelationships {
    [key: string]: JsonApiRelationship
}

export interface JsonApiRelationship {
    data: JsonApiRelationshipData | JsonApiRelationshipData[]
}

export interface JsonApiRelationshipData {
    id: string
    type: string
}

export interface JsonApiModel {
    id: string
    type: string
    attributes: JsonApiAttributes
    relationships: JsonApiRelationships
}

export interface JsonApiMeta {
    [key: string]: any
}
