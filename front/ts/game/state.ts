import { Game } from "../../../common/entities/game";
import { Player } from "../../../common/entities/player";
import { Level } from "../../../common/entities/level";

class State {
    public game: Game = new Game();
    public level: Level = null;
    public player: Player = new Player();

    // Player state
    getPlayer(): Player {
        return this.player;
    }

    // Level state
    getLevel(): Level | null {
        return this.level;
    }

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

        console.log(`Starting game: ${this.game.name}!`);
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

    validateLevel(): boolean {
        if (!this.validateGame()) {
            return false;
        }
        if (!this.level) {
            return false;
        }

        return true;
    }
}

export const state = new State();