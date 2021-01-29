import { Server, Socket } from "socket.io";
import { Game } from "../../common/entities/game";
import { Level } from "../../common/entities/level";
import { Player } from "../../common/entities/player";
import { CorrectGuess, CreatePlayer, Guess, LevelStart, PlayerJoined } from "../../common/events/events";
import { objectToInstance, serialize } from "../../common/helpers/object";
import { insidePoly } from "../../common/helpers/poly";

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

const levels = [
    objectToInstance(require('../../common/data/workshop.json'), new Level()),
    objectToInstance(require('../../common/data/toys.json'), new Level()),
];

io.on('connection', (socket: Socket) => {
    console.log('connection');

    let player: Player = null;

    socket.on('init', data => {
        console.log('init', data);
    });

    socket.on('createPlayer', (createPlayer: CreatePlayer) => {
        console.log('createPlayer', createPlayer);
        player = game.players.find(p => p.name === createPlayer.name);
        if (!player) {
            player = new Player();
            game.players.push(player);
        }
        player._socket = socket;
        player.name = createPlayer.name;
        const playerJoined: PlayerJoined = {
            player,
        };
        game.broadcast('playerJoined', playerJoined);
        player.emit('youJoined', {});
        game.broadcast('gamesList', [game]);
    });

    socket.on('joinGame', data => {
        console.log('joinGame', data);
        const levelStart: LevelStart = {
            game,
        };
        if (!game.level) {
            game.level = levels[Math.floor(Math.random() * levels.length)];
            game.levelStartTime = new Date().getTime();
            game.broadcast('levelStart', levelStart);
            setTimeout(() => {
                game.broadcast('levelEnd', {});
                setTimeout(() => {
                    game.level = levels[Math.floor(Math.random() * levels.length)];
                    game.levelStartTime = new Date().getTime();
                    game.broadcast('levelStart', levelStart);
                }, 1000);
            }, game.roundTime);
        } else {
            player.emit('levelStart', levelStart);
        }
    });

    socket.on('guess', (guess: Guess) => {
        console.log('guess', guess);
        for (const c in game.level.clues) {
            const clue = game.level.clues[c];
            for (const i in clue.items) {
                const item = clue.items[i];
                if (insidePoly({
                    x: guess.xPercent,
                    y: guess.yPercent,
                }, item.path)) {
                    const key = `${player.name}:${c}:${i}`;
                    game._correctGuesses[key] = true;
                    player.score += Math.round(Math.max(0, (game.roundTime - (new Date().getTime() - game.levelStartTime)) / 100));
                    const correctGuess: CorrectGuess = {
                        player,
                    };
                    game.broadcast('correctGuess', correctGuess);
                    if (Object.keys(game._correctGuesses).length === game.totalGuesses) {
                        game.broadcast('guessingComplete', {});
                    }
                }
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
    });

    socket.emit('init');
});

console.log('Listening on port', port);

