type FilterFunction = (...args: any[]) => any;

export interface IFilter {
    inject: string[];
    filter(...injected: any[]): FilterFunction;
}
