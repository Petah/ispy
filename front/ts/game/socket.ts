import { IScope, ILocationService } from "angular";
import { Game } from "../../../common/entities/game";
import { Level } from "../../../common/entities/level";
import { Player } from "../../../common/entities/player";
import { objectToInstance } from "../../../common/helpers/object";
import { state } from "./state";

class Socket {
    private socket: SocketIOClient.Socket;
    private $rootScope: IScope;
    private $location: ILocationService;

    init($rootScope: IScope, $location: ILocationService) {
        this.$rootScope = $rootScope;
        this.$location = $location;

        this.socket = io('http://192.168.1.9:3000');

        this.bind('init', (data) => {
        });

        this.bind('playerJoined', (data) => {
            const player = new Player();
            player.name = data.name;
            state.game.players.push(player);
        });

        this.bind('youJoined', (data) => {
            state.player.joined = true;
        });

        this.bind('youJoined', (data) => {
            state.player.joined = true;
            this.goto('/select-level');
        });

        this.bind('levelStart', (data) => {
            state.level = objectToInstance(data, new Level());
            this.goto('/round');
        });
    }

    public joinGame(name: string) {
        this.socket.emit('joinGame', {
            name,
        });
    }

    private goto(route: string) {
        console.log('Going to', route);
        this.$location.path(route);
    }

    private bind(event: string, callback) {
        this.socket.on(event, (data) => {
            console.log('Socket received', event, data);
            callback(data);
            this.$rootScope.$apply();
        });
    }
}

export const socket = new Socket();