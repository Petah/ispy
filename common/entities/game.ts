import { serialize } from "../helpers/object";
import { Level } from "./level";
import { Player } from "./player";

export class Game {
    public id: string;
    public name: string;
    public players: Player[] = [];
    public level: Level;
    public levelStartTime: number;
    public roundTime: number = 1000 * 60;
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
}
