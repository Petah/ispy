import { LevelStart } from "../events/events";
import { serialize } from "../helpers/object";
import { Level } from "./level";
import { Player } from "./player";

export class Game {
    public id: string;
    public name: string;
    public players: Player[] = [];
    public level: Level;
    public levelStartTime: number;
    public roundTime: number = 1000 * 10;
    public _levelsIndex: number = 0;
    public _levels: Level[];
    public _correctGuesses = {};

    public broadcast(event: string, data) {
        for (const player of this.players) {
            player._socket.emit(event, serialize(data));
        }
    }

    public get totalGuesses(): number {
        let i = 0;
        for (const clue of this.level.clues) {
            for (const item of clue.items) {
                i++;
            }
        }
        return i;
    }

    public get timeRemaining(): string {
        return ((this.levelStartTime + this.roundTime - new Date().getTime()) / 1000).toFixed(1);
    }

    public startNextLevel() {
        if (this._levelsIndex >= this._levels.length) {
            this._levelsIndex = 0;
        }
        this.level = this._levels[this._levelsIndex];
        this._levelsIndex++;
        this.levelStartTime = new Date().getTime();
        this._correctGuesses = [];

        for (const player of this.players) {
            player.life = 3;
        }

        const levelStart: LevelStart = {
            game: this,
        };
        this.broadcast('levelStart', levelStart);
        setTimeout(() => {
            this.broadcast('levelEnd', {});
            setTimeout(() => {
                this.startNextLevel();
            }, 1000);
        }, this.roundTime);
    }
}
