import { IHttpService } from "angular";

class State {
    private $http: IHttpService;
    private initialized: boolean = false;

    private game: object;
    private player: object;

    init($http: IHttpService) {
        if (this.initialized) {
            return;
        }

        this.$http = $http;
        this.game = null;
        this.player = null;
    }

    // Player state
    async createPlayer(name: string): Promise<void> {
        this.player = await this.$http.post('http://0.0.0.0:9511/players/create', { name });
        console.log('Created player!', this.player);
    }

    get hasPlayer(): boolean {
        return this.player ? true : false;
    }

    // Game state
    async startGame(name: string): Promise<void> {
        if (!this.player) {
            alert('You need to create a character for yourself first.');

            return;
        }

        this.game = await this.$http.post('http://0.0.0.0:9511/games/create', { name });
        console.log('Starting game!', this.game);
    }
}

export const state = new State();