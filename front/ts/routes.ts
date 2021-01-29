import { AdminController } from './controllers/admin/admin-controller';
import { CreateGameController } from './controllers/create-game-controller';
import { IController } from './controllers/controller';
import { SelectLevelController } from './controllers/select-level-controller';
import { WelcomeController } from './controllers/welcome-controller';
import { RoundController } from './controllers/round-controller';
import { LevelListController } from './controllers/admin/level-list-controller';
import { LevelEditController } from './controllers/admin/level-edit-controller';

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
    {
        path: '/select-level',
        templateUrl: '/select-level.html',
        controller: {
            name: 'SelectLevelController',
            handler: SelectLevelController
        },
    },
    {
        path: '/round',
        templateUrl: '/round.html',
        controller: {
            name: 'RoundController',
            handler: RoundController
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
    {
        path: '/admin/levels/list',
        templateUrl: '/admin/levels/list.html',
        controller: {
            name: 'LevelListController',
            handler: LevelListController,
        },
    },
    {
        path: '/admin/levels/edit/:id',
        templateUrl: '/admin/levels/form.html',
        controller: {
            name: 'LevelEditController',
            handler: LevelEditController,
        },
    },
];
