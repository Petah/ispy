import { AdminController } from './controllers/admin/admin-controller';
import { CreateGameController } from './controllers/create-game-controller';
import { HomeController } from './controllers/home-controller';
import { IController } from './controllers/controller';
import { JoinGameController } from './controllers/join-game-controller';
import { LevelListController } from './controllers/admin/level-list-controller';
import { LevelEditController } from './controllers/admin/level-edit-controller';
import { RoundController } from './controllers/round-controller';
import { ScoreboardController } from './controllers/scoreboard-controller';

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
        templateUrl: '/home.html',
        controller: {
            name: 'HomeController',
            handler: HomeController
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
        path: '/join-game',
        templateUrl: '/join-game.html',
        controller: {
            name: 'JoinGameController',
            handler: JoinGameController
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
    {
        path: '/scoreboard',
        templateUrl: '/scoreboard.html',
        controller: {
            name: 'ScoreboardController',
            handler: ScoreboardController
        },
    }
];
