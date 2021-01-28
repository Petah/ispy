type FilterFunction = (...args: any[]) => any;

export interface Filter {
    inject: string[];
    filter(...injected: any[]): FilterFunction;
}
