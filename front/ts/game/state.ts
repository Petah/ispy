import { api } from "./api";

class State {
    private game: object;
    private player: object;

    // Player state
    async createPlayer(name: string): Promise<void> {
        this.player = await api.createPlayer(name);
    }

    get hasPlayer(): boolean {
        return this.player ? true : false;
    }

    // Game state
    async startGame(name: string): Promise<void> {
        if (!this.player) {
            alert('You need to set the player name first.');

            return;
        }

        this.game = await api.createGame(name);
    }
}

export const state = new State();