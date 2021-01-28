import { IController } from './controllers/controller';
import { WelcomeController } from './controllers/welcome-controller';

export interface IRouteController {
    name: string,
    class: new () => IController,
}

export interface IRoute {
    path: string,
    template: string,
    controller: IRouteController,
}

export const Routes = [
    {
        path: '/',
        template: '<h1>Message: {{ message }}</h1>',
        controller: {
            name: 'WelcomeController',
            class: WelcomeController
        },
    }
];
