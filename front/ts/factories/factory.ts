type FactoryObject = any;

export interface IFactory {
    inject: string[];
    factory(...injected: any[]): FactoryObject;
}
