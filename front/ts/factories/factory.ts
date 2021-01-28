type FactoryObject = any;

export interface Factory {
    inject: string[];
    factory(...injected: any[]): FactoryObject;
}
