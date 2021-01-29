export interface IController {
    inject: string[];
    controller(...injected: any[]): void;
}
