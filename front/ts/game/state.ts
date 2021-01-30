import { Game } from "../../../common/entities/game";
import { Player } from "../../../common/entities/player";
import { Level } from "../../../common/entities/level";

class State {
    public game: Game;
    public gamesList: Game[] = [];
    public level: Level = null;
    public player: Player = new Player();
    public clue: string = '';
}

export const state = new State();