import { Game } from "../entities/game";
import { Player } from "../entities/player";

export interface Guess {
    xPercent: number,
    yPercent: number,
}

export interface CorrectGuess {
    player: Player,
}

export interface LevelStart {
    game: Game,
}

export interface CreatePlayer {
    name: string,
}

export interface PlayerJoined {
    player: Player,
}