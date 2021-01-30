import { LevelStart } from "../events/events";
import { serialize } from "../helpers/object";
import { Clue, Level } from "./level";
import { Player } from "./player";

export class Game {
    public id: string;
    public name: string;
    public players: Player[] = [];
    public level: Level;
    public levelStartTime: number;
    public roundTime: number = 1000 * 10;
    public started: boolean = false;
    public _levelsIndex: number = 0;
    public _levels: Level[];
    public _correctGuesses = {};
    public _playerClues: { [key: string]: Clue; } = {};

    public broadcast(event: string, data, excludePlayer: Player = null) {
        for (const player of this.players) {
            if (excludePlayer && player.name === excludePlayer.name) {
                continue;
            }
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
        this.started = true;
        this.level = this._levels[this._levelsIndex];
        this._levelsIndex++;
        this.levelStartTime = new Date().getTime();
        this._correctGuesses = [];
        this._playerClues = {};

        for (const player of this.players) {
            this._playerClues[player.name] = this.level.clues[Math.floor(Math.random() * this.level.clues.length)];
            player.life = 3;
            const levelStart: LevelStart = {
                game: this,
                clue: this._playerClues[player.name].text,
            };
            player.emit('levelStart', levelStart)
        }

        setTimeout(() => {
            this.broadcast('levelEnd', {});
            setTimeout(() => {
                this.startNextLevel();
            }, 1000);
        }, this.roundTime);
    }

    public stop() {
        this.level = null;
        this.levelStartTime = null;
        this.started = false;
        this._levelsIndex = 0;
        this._correctGuesses = {};
        this._playerClues = {};
    }
}
