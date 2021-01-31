import { GameFinished, LevelEnd, LevelStart } from "../events/events";
import { serialize } from "../helpers/object";
import { Clue, Level } from "./level";
import { Player } from "./player";

export class Game {
    public id: string;
    public name: string;
    public titleImage: string;
    public info: string;
    public players: Player[] = [];
    public level: Level;
    public levelStartTime: number;
    public roundTime: number = 1000 * 30;
    public started: boolean = false;
    public levelEnded: boolean = false;
    public finished: boolean = false;
    public _levelsIndex: number = 0;
    public _levels: Level[];
    public _correctGuesses = {};
    public _playerClues: { [key: string]: Clue; } = {};
    public _endTimeout = null;
    public _nextLevelTimeout = null;

    public broadcast(event: string, data, excludePlayer: Player = null) {
        for (const player of this.players) {
            if (excludePlayer && player.name === excludePlayer.name) {
                continue;
            }
            player._socket.emit(event, serialize(data));
        }
    }

    public get totalGuesses(): number {
        if (!this.level) {
            return 0;
        }
        let i = 0;
        let c = 0;
        for (const clue of this.level.clues) {
            c++;
            if (c > this.players.length) {
                break
            }
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
            this.level = null;
            this.levelStartTime = null;
            this.finished = true;
            this.levelEnded = true;
            const gameFinished: GameFinished = {
                game: this,
            };
            this.broadcast('gameFinished', gameFinished)
            this.clearTimeouts();
            return;
        }
        this.started = true;
        this.levelEnded = false;
        this.level = this._levels[this._levelsIndex];
        this._levelsIndex++;
        this.levelStartTime = new Date().getTime();
        this._correctGuesses = [];
        this._playerClues = {};

        for (const player of this.players) {
            const clue = this.level.clues[Math.floor(Math.random() * this.level.clues.length)];
            this._playerClues[player.name] = clue;
            player.life = 3;
            player.roundScore = 0;
            player.items = clue.items.length;
            const levelStart: LevelStart = {
                game: this,
                player,
                clue: clue.text,
            };
            player.emit('levelStart', levelStart)
        }

        this._endTimeout = setTimeout(() => {
            this.end();
        }, this.roundTime);
    }

    public end() {
        clearTimeout(this._endTimeout);
        this.levelEnded = true;
        const levelEnd: LevelEnd = {
            game: this,
        };
        this.broadcast('levelEnd', levelEnd);
        this._nextLevelTimeout = setTimeout(() => {
            this.startNextLevel();
        }, 5000);
    }

    private clearTimeouts() {
        clearTimeout(this._endTimeout);
        clearTimeout(this._nextLevelTimeout);
    }

    public stop() {
        this.level = null;
        this.levelStartTime = null;
        this.started = false;
        this.finished = false;
        this._levelsIndex = 0;
        this._correctGuesses = {};
        this._playerClues = {};
        this.clearTimeouts();
    }
}
