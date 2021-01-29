"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const game_1 = require("./game");
const level_1 = require("./level");
const player_1 = require("./player");
class Api {
    constructor() {
        this.$http = null;
        this.apiBaseUrl = 'http://192.168.1.9:9511';
    }
    init($http) {
        if (this.$http) {
            return;
        }
        this.$http = $http;
    }
    async post(url, data) {
        const response = await this.$http.post(`${this.apiBaseUrl}/api/${url}`, data);
        return response.data;
    }
    async get(url) {
        const response = await this.$http.get(`${this.apiBaseUrl}/api/${url}`);
        return response.data;
    }
    async createPlayer(name) {
        const response = await this.post('players/create', {
            data: {
                attributes: {
                    name: name,
                },
            },
        });
        const player = player_1.Player.mapModel(response);
        console.log('Created player!', player);
        return player;
    }
    async getGames() {
        const response = await this.get('games/list');
        const games = game_1.Game.mapModels(response);
        console.log('Fetched games!', games);
        return games;
    }
    async getGame(id) {
        const response = await this.get(`games/fetch/${id}`);
        const game = game_1.Game.mapModel(response);
        console.log('Fetched game!', game);
        return game;
    }
    async createGame(name) {
        const response = await this.post('games/create', {
            data: {
                attributes: {
                    name: name,
                },
            },
        });
        const game = game_1.Game.mapModel(response);
        console.log('Created game!', game);
        return game;
    }
    async joinGame(game) {
        return true;
    }
    async getLevels() {
        const response = await this.get('levels/list');
        const levels = level_1.Level.mapModels(response);
        console.log('Fetched levels!', levels);
        return levels;
    }
    async getLevel(id) {
        const response = await this.get(`levels/fetch/${id}`);
        const level = level_1.Level.mapModel(response);
        console.log('Fetched level!', level);
        return level;
    }
}
exports.api = new Api();
