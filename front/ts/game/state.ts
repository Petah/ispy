import { Game } from "./game";
import { Level } from "./level";
import { Player } from "./player";

class State {
    private game: Game = null;
    private level: Level = null;
    private player: Player = null;

    // Player state
    setPlayer(player: Player): void {
        this.player = player;
    }

    get hasPlayer(): boolean {
        return this.player ? true : false;
    }

    // Level state
    setLevel(level: Level): void {
        if (!this.validateGame()) {
            return;
        }

        this.level = level;
    }

    // Game state
    setGame(game: Game): void {
        this.game = game;
    }

    startGame(): Promise<void> {
        if (!this.validateGame()) {
            return;
        }

        console.log(`Starting game: ${this.game.attributes.name}!`);
    }

    // Validations
    validateGame(): boolean {
        if (!this.player) {
            console.error('You need to set the player name first.');

            return false;
        }
        if (!this.game) {
            console.error('No game initialized!');

            return false;
        }

        return true;
    }
}

export const state = new State();