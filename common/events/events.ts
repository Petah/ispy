import { Game } from "../entities/game";
import { Clue } from "../entities/level";
import { Player } from "../entities/player";

export interface Guess {
    xPercent: number,
    yPercent: number,
}

export interface CorrectGuess {
    game: Game,
    clue: Clue,
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
