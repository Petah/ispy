import { Controller } from './controllers/controller';
import { WelcomeController } from './controllers/welcome-controller';

export interface Route {
    path: string,
    template: string,
    controller: new () => Controller,
    controllerClass: string,
}

export const Routes = [
    {
        path: '/',
        template: '<h1>Message: {{ message }}</h1>',
        controller: WelcomeController,
        controllerClass: 'WelcomeController'
    }
];
