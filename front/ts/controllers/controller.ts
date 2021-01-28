export interface Controller {
    inject: string[];
    controller(...injected: any[]): void;
}
