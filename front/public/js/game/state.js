"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.state = void 0;
class State {
    constructor() {
        this.game = null;
        this.level = null;
        this.player = null;
    }
    getPlayer() {
        return this.player;
    }
    setPlayer(player) {
        this.player = player;
    }
    get hasPlayer() {
        return this.player ? true : false;
    }
    getLevel() {
        return this.level;
    }
    setLevel(level) {
        if (!this.validateGame()) {
            return;
        }
        this.level = level;
    }
    setGame(game) {
        this.game = game;
    }
    startGame() {
        if (!this.validateGame()) {
            return;
        }
        console.log(`Starting game: ${this.game.attributes.name}!`);
    }
    validateGame() {
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
    validateLevel() {
        if (!this.validateGame()) {
            return false;
        }
        if (!this.level) {
            return false;
        }
        return true;
    }
}
exports.state = new State();
