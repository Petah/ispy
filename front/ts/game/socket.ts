import { IScope, ILocationService } from "angular";
import { Game } from "../../../common/entities/game";
import { Level } from "../../../common/entities/level";
import { Player } from "../../../common/entities/player";
import { objectToInstance } from "../../../common/helpers/object";
import { state } from "./state";

class Socket {
    private socket: SocketIOClient.Socket;

    init($rootScope: IScope, $location: ILocationService) {
        this.socket = io('http://192.168.1.9:3000');
        this.socket.on('init', (data) => {
            console.log('init', data);
            $rootScope.$apply();
        });

        this.socket.on('playerJoined', (data) => {
            console.log('playerJoined', data);
            const player = new Player();
            player.name = data.name;
            state.game.players.push(player);
            $rootScope.$apply();
        });

        this.socket.on('youJoined', (data) => {
            console.log('youJoined', data);
            state.player.joined = true;
            $rootScope.$apply();
        });

        this.socket.on('youJoined', (data) => {
            console.log('youJoined', data);
            state.player.joined = true;
            $rootScope.$apply();
        });

        this.socket.on('levelStart', (data) => {
            console.log('levelStart', data);
            state.level = objectToInstance(data, new Level());
            $location.path('/round');
            $rootScope.$apply();
        });

    }

    joinGame(name: string) {
        this.socket.emit('joinGame', {
            name,
        });
    }
}

export const socket = new Socket();