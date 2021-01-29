import { Socket } from "socket.io";

export class Player {
    public name: string;
    public _socket: Socket;
    public joined: boolean = false;
}
