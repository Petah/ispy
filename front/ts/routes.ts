import { IController } from './controllers/controller';
import { WelcomeController } from './controllers/welcome-controller';
import { CreateGameController } from './controllers/create-game-controller';

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
        path: '/create-game',
        templateUrl: '/create-game.html',
        controller: {
            name: 'CreateGameController',
            handler: CreateGameController
        },
    },
];
