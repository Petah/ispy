import { IHttpService } from "angular";
import { JsonApiData } from "../helpers/json-api/types";

class Api {
    private $http: IHttpService = null;
    private apiBaseUrl: string = 'http://0.0.0.0:9511';

    init($http: IHttpService) {
        if (this.$http) {
            return;
        }

        this.$http = $http;
    }

    // Player state
    async createPlayer(name: string): Promise<any> {
        const res = await this.$http.post<JsonApiData>(
            `${this.apiBaseUrl}/api/players/create`,
            { name }
        );
        const player = res.data.data;
        console.log('Created player!', player);

        return player;
    }

    // Game state
    async createGame(name: string): Promise<any> {
        const res = await this.$http.post<JsonApiData>(
            `${this.apiBaseUrl}/api/games/create`,
            { name }
        );
        const game = res.data.data;
        console.log('Created game!', game);

        return game;
    }
}

export const api = new Api();