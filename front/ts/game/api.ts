import { IHttpService } from "angular";

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
    async createPlayer(name: string): Promise<object> {
        const player = await this.$http.post(`${this.apiBaseUrl}/api/players/create`, { name });
        console.log('Created player!', player);

        return player;
    }

    // Game state
    async createGame(name: string): Promise<object> {
        const game = await this.$http.post(`${this.apiBaseUrl}/api/games/create`, { name });
        console.log('Created game!', game);

        return game;
    }
}

export const api = new Api();