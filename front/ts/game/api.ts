import { IHttpService } from "angular";
import { JsonApiData, JsonApiModel } from "../helpers/json-api/types";
import { Game } from "./game";
import { Player } from "./player";

class Api {
    private $http: IHttpService = null;
    private apiBaseUrl: string = 'http://127.0.0.1:9511';

    init($http: IHttpService) {
        if (this.$http) {
            return;
        }

        this.$http = $http;
    }

    async post<T>(url: string, data: any): Promise<JsonApiData<T>> {
        const response = await this.$http.post<JsonApiData<T>>(`${this.apiBaseUrl}/api/${url}`, data);
        return response.data;
    }

    // Player state
    async createPlayer(name: string): Promise<Player> {
        const response = await this.post<JsonApiModel>('players/create', {
            name
        });
        const player = Player.mapModel(response);
        console.log('Created player!', player);
        return player;
    }

    // Game state
    async createGame(name: string): Promise<any> {
        const response = await this.post<JsonApiModel>('games/create', {
            name
        });
        const game = Game.mapModel(response);
        console.log('Created game!', game);
        return game;
    }
}

export const api = new Api();