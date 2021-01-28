import { Game } from "./game";
import { Player } from "./player";

class State {
    private game: Game = null;
    private player: Player = null;

    // Player state
    setPlayer(player: any): void {
        this.player = player;
    }

    get hasPlayer(): boolean {
        return this.player ? true : false;
    }

    // Game state
    setGame(game: any): void {
        this.game = game;
    }

    startGame(): Promise<void> {
        if (!this.player) {
            alert('You need to set the player name first.');

            return;
        }
        if (!this.game) {
            alert('No game initialized!');

            return;
        }

        console.log(`Starting game: ${this.game.attributes.name}!`);
    }
}

export const state = new State();