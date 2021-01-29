import { Socket } from "socket.io";
import { serialize } from "../helpers/object";

export class Player {
    public name: string;
    public _socket: Socket;
    public joined: boolean = false;
    public score: number = 0;

    public emit(event: string, data) {
        this._socket.emit(event, serialize(data));
    }
}
