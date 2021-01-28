import { Controller } from './controllers/controller';
import { WelcomeController } from './controllers/welcome-controller';

export interface Route {
    path: string,
    templateUrl: string,
    controller: new () => Controller,
    controllerClass: string,
}

export const Routes: Route[] = [
    {
        path: '/',
        templateUrl: '/welcome.html',
        controller: WelcomeController,
        controllerClass: 'WelcomeController'
    }
];
