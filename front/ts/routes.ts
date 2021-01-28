import { IController } from './controllers/controller';
import { WelcomeController } from './controllers/welcome-controller';

export interface IRouteController {
    name: string,
    handler: new () => IController,
}

export interface IRoute {
    path: string,
    template: string,
    controller: IRouteController,
}

export const Routes: IRoute[] = [
    {
        path: '/',
        template: '<h1>Message: {{ message }}</h1>',
        controller: {
            name: 'WelcomeController',
            handler: WelcomeController
        },
    }
];
