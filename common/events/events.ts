import { Game } from "../entities/game";
import { Clue } from "../entities/level";
import { Player } from "../entities/player";

export interface Guess {
    xPercent: number,
    yPercent: number,
    pageX: number,
    pageY: number,
}

export interface CorrectGuess {
    game: Game,
    clue: Clue,
    player: Player,
    guess?: Guess,
}

export interface DuplicateGuess {
    game: Game,
    clue: Clue,
    player: Player,
    guess?: Guess,
}

export interface IncorrectGuess {
    game: Game,
    player: Player,
    guess: Guess,
}

export interface PlayerLeft {
    game: Game,
    player: Player,
}

export interface NoLife {
    guess: Guess,
}

export interface LevelStart {
    game: Game,
    clue: string,
}

export interface JoinedGame {
    game: Game,
    player: Player,
}

export interface CreatePlayer {
    name: string,
}

export interface PlayerJoined {
    player: Player,
}

export interface JoinGame {
    game: Game,
    player: Player,
}

export interface StartGame {
}
