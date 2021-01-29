import { Server, Socket } from "socket.io";
import { Game } from "../../common/entities/game";
import { Level } from "../../common/entities/level";
import { Player } from "../../common/entities/player";
import { objectToInstance } from "../../common/helpers/object";

const port = 3000;

const io = new Server(port, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    },
});

const game = new Game();
const levelData = require('../../common/data/level.json');
game.level = objectToInstance(levelData, new Level());
console.log(game.level);
// game.level

io.on('connection', (socket: Socket) => {
    console.log('connection');
    socket.on('event', data => {
        console.log('event', data);
    });
    socket.on('init', data => {
        console.log('init', data);
    });
    socket.on('joinGame', data => {
        console.log('joinGame', data);
        const player = new Player();
        player.name = data.playerName;
        player.socket = socket;
        game.players.push(player);
        game.broadcast('playerJoined', {
            name: player.name,
        });
        player.socket.emit('youJoined');
        game.broadcast('levelStart', game.level);
    });
    socket.on('disconnect', () => {
        console.log('disconnect');
    });
    socket.emit('init');
});

console.log('Listening on port', port);

