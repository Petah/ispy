"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const admin_controller_1 = require("./controllers/admin/admin-controller");
const create_game_controller_1 = require("./controllers/create-game-controller");
const home_controller_1 = require("./controllers/home-controller");
const join_game_controller_1 = require("./controllers/join-game-controller");
const level_list_controller_1 = require("./controllers/admin/level-list-controller");
const level_edit_controller_1 = require("./controllers/admin/level-edit-controller");
const round_controller_1 = require("./controllers/round-controller");
const select_level_controller_1 = require("./controllers/select-level-controller");
exports.Routes = [
    {
        path: '/',
        templateUrl: '/home.html',
        controller: {
            name: 'HomeController',
            handler: home_controller_1.HomeController
        },
    },
    {
        path: '/create-game',
        templateUrl: '/create-game.html',
        controller: {
            name: 'CreateGameController',
            handler: create_game_controller_1.CreateGameController
        },
    },
    {
        path: '/join-game',
        templateUrl: '/join-game.html',
        controller: {
            name: 'JoinGameController',
            handler: join_game_controller_1.JoinGameController
        },
    },
    {
        path: '/select-level',
        templateUrl: '/select-level.html',
        controller: {
            name: 'SelectLevelController',
            handler: select_level_controller_1.SelectLevelController
        },
    },
    {
        path: '/round',
        templateUrl: '/round.html',
        controller: {
            name: 'RoundController',
            handler: round_controller_1.RoundController
        },
    },
    {
        path: '/admin',
        templateUrl: '/admin/index.html',
        controller: {
            name: 'AdminController',
            handler: admin_controller_1.AdminController,
        },
    },
    {
        path: '/admin/levels/list',
        templateUrl: '/admin/levels/list.html',
        controller: {
            name: 'LevelListController',
            handler: level_list_controller_1.LevelListController,
        },
    },
    {
        path: '/admin/levels/edit/:id',
        templateUrl: '/admin/levels/form.html',
        controller: {
            name: 'LevelEditController',
            handler: level_edit_controller_1.LevelEditController,
        },
    },
];
