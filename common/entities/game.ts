import { Level } from "./level";
import { Player } from "./player";

export class Game {
    public name: string;
    public players: Player[] = [];
    public level: Level;

    public broadcast(event: string, data) {
        for (const player of this.players) {
            player.socket.emit(event, data);
        }
    }
}
