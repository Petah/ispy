import { AdminController } from './controllers/admin/admin-controller';
import { IController } from './controllers/controller';
import { WelcomeController } from './controllers/welcome-controller';

export interface IRouteController {
    name: string,
    handler: new () => IController,
}

export interface IRoute {
    path: string,
    templateUrl: string,
    controller: IRouteController,
}

export const Routes: IRoute[] = [
    {
        path: '/',
        templateUrl: '/welcome.html',
        controller: {
            name: 'WelcomeController',
            handler: WelcomeController
        },
    },

    {
        path: '/admin',
        templateUrl: '/admin/index.html',
        controller: {
            name: 'AdminController',
            handler: AdminController,
        },
    },
];