import { Server, Socket } from "socket.io";
import { Game } from "../../common/entities/game";
import { Level } from "../../common/entities/level";
import { Player } from "../../common/entities/player";
import { objectToInstance, serialize } from "../../common/helpers/object";

const port = 3000;

const io = new Server(port, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    },
});

const game = new Game();
game.id = 'test';
game.name = 'Test Game';
const levelData = require('../../common/data/level.json');
game.level = objectToInstance(levelData, new Level());

io.on('connection', (socket: Socket) => {
    console.log('connection');

    const player = new Player();
    player._socket = socket;

    socket.on('init', data => {
        console.log('init', data);
    });

    socket.on('createPlayer', data => {
        console.log('createPlayer', data);
        player.name = data.playerName;
        game.players.push(player);
        game.broadcast('playerJoined', {
            name: player.name,
        });
        player._socket.emit('youJoined');
        game.broadcast('gamesList', [game]);
    });

    socket.on('joinGame', data => {
        console.log('joinGame', data);
        game.broadcast('levelStart', game.level);
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
    });

    socket.emit('init');
});

console.log('Listening on port', port);

