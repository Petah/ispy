import { IHttpService } from "angular";

class Api {
    private $http: IHttpService = null;
    private apiBaseUrl: string = 'http://192.168.1.9:9511';

    init($http: IHttpService) {
        if (this.$http) {
            return;
        }

        this.$http = $http;
    }

    // async post<T>(url: string, data: any): Promise<JsonApiData<T>> {
    //     const response = await this.$http.post<JsonApiData<T>>(`${this.apiBaseUrl}/api/${url}`, data);
    //     return response.data;
    // }

    // async get<T>(url: string): Promise<JsonApiData<T>> {
    //     const response = await this.$http.get<JsonApiData<T>>(`${this.apiBaseUrl}/api/${url}`);
    //     return response.data;
    // }

    // async createPlayer(name: string): Promise<Player> {
    //     const response = await this.post<JsonApiModel>('players/create', {
    //         data: {
    //             attributes: {
    //                 name: name,
    //             },
    //         },
    //     });
    //     const player = Player.mapModel(response);
    //     console.log('Created player!', player);
    //     return player;
    // }

    // async createGame(name: string): Promise<any> {
    //     const response = await this.post<JsonApiModel>('games/create', {
    //         data: {
    //             attributes: {
    //                 name: name,
    //             },
    //         },
    //     });
    //     const game = Game.mapModel(response);
    //     console.log('Created game!', game);
    //     return game;
    // }

    // async joinGame(game: Game): Promise<boolean> {
    //     // @Todo check if player can join game
    //     // const response = await this.get<JsonApiModel>(`games/fetch/${game.id}`);
    //     // const game = Game.mapModel(response);
    //     // console.log('Created game!', game);
    //     return true;
    // }

    // async getLevels(): Promise<any> {
    //     const response = await this.get<JsonApiModel>('levels/list');
    //     const levels = Level.mapModels(response);
    //     console.log('Fetched levels!', levels);
    //     return levels;
    // }

    // async getLevel(id: string): Promise<Level> {
    //     const response = await this.get<JsonApiModel>(`levels/fetch/${id}`);
    //     const level = Level.mapModel(response);
    //     console.log('Fetched level!', level);
    //     return level;
    // }
}

export const api = new Api();