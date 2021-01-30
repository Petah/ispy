import { Server, Socket } from "socket.io";
import { Game } from "../../common/entities/game";
import { Level } from "../../common/entities/level";
import { Player } from "../../common/entities/player";
import { CorrectGuess, CreatePlayer, Guess, LevelStart, PlayerJoined, IncorrectGuess, NoLife, DuplicateGuess, JoinGame, PlayerLeft } from "../../common/events/events";
import { objectToInstance, serialize } from "../../common/helpers/object";
import { insidePoly } from "../../common/helpers/poly";

const port = 3000;

const io = new Server(port, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    },
});

const game1 = new Game();
game1.id = 'test1';
game1.name = 'Test Game 1';
game1._levels = [
    objectToInstance(require('../../common/data/workshop.json'), new Level()),
    objectToInstance(require('../../common/data/toys.json'), new Level()),
];

const game2 = new Game();
game2.id = 'test2';
game2.name = 'Test Game 2';
game2._levels = [
    objectToInstance(require('../../common/data/workshop.json'), new Level()),
    objectToInstance(require('../../common/data/toys.json'), new Level()),
];

const games: Game[] = [
    game1,
    game2,
];

const allPlayers: Player[] = [];

function findPlayerGame(player: Player): Game {
    for (const game of games) {
        console.log('game.players2', game.players)
        for (const p of game.players) {
            if (p.name === player.name) {
                return game;
            }
        }
    }
    return null;
}

io.on('connection', (socket: Socket) => {
    console.log('connection');

    let player: Player = null;

    socket.on('init', data => {
        console.log('init', data);
    });

    socket.on('createPlayer', (createPlayer: CreatePlayer) => {
        console.log('createPlayer', createPlayer);
        player = allPlayers.find(p => p.name === createPlayer.name);
        if (!player) {
            player = new Player();
            allPlayers.push(player);
        }
        player._socket = socket;
        player.name = createPlayer.name;
        const playerJoined: PlayerJoined = {
            player,
        };
        // game.broadcast('playerJoined', playerJoined);
        player.emit('youJoined', {});
        player.emit('gamesList', games);
    });

    socket.on('joinGame', (joinGame: JoinGame) => {
        console.log('joinGame', joinGame);
        const game = games.find(g => g.id == joinGame.game.id)
        player = game.players.find(p => p.name === joinGame.player.name);
        if (!player) {
            player = allPlayers.find(p => p.name === joinGame.player.name);
            if (!player) {
                console.log('No player found', joinGame.player.name);
                return;
            }
            game.players.push(player);
        }
        if (!game.level) {
            game.startNextLevel();
        } else {
            const levelStart: LevelStart = {
                game,
            };
            player.emit('levelStart', levelStart);
        }
    });

    socket.on('guess', (guess: Guess) => {
        console.log('guess', guess);
        const game = findPlayerGame(player);
        if (player.life === 0) {
            const noLife: NoLife = {
                guess,
            };
            player.emit('noLife', noLife);
            return;
        }
        let found = false;
        for (const c in game.level.clues) {
            const clue = game.level.clues[c];
            for (const i in clue.items) {
                const item = clue.items[i];
                if (insidePoly({
                    x: guess.xPercent,
                    y: guess.yPercent,
                }, item._path)) {
                    found = true;
                    const key = `${player.name}:${c}:${i}`;
                    if (!game._correctGuesses[key]) {
                        game._correctGuesses[key] = true;
                        player.score += Math.round(Math.max(0, (game.roundTime - (new Date().getTime() - game.levelStartTime)) / 100));
                        const correctGuess: CorrectGuess = {
                            game,
                            clue,
                            player,
                        };
                        game.broadcast('correctGuess', correctGuess, player);
                        correctGuess.guess = guess;
                        player.emit('correctGuess', correctGuess);
                        if (Object.keys(game._correctGuesses).length === game.totalGuesses) {
                            game.broadcast('guessingComplete', {});
                        }
                    } else {
                        const duplicateGuess: DuplicateGuess = {
                            game,
                            clue,
                            player,
                            guess,
                        };
                        player.emit('duplicateGuess', duplicateGuess);
                    }
                }
            }
        }
        if (!found) {
            player.life--;
            const incorrectGuess: IncorrectGuess = {
                game,
                player,
                guess,
            };
            game.broadcast('incorrectGuess', incorrectGuess);
        }
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
        if (player) {
            const game = findPlayerGame(player);
            if (game) {
                const index = game.players.indexOf(player);
                if (index !== -1) {
                    game.players.splice(index, 1);
                    const playerLeft: PlayerLeft = {
                        game,
                        player,
                    };
                    game.broadcast('playerLeft', playerLeft);
                }
            }
            const index = allPlayers.indexOf(player);
            if (index !== -1) {
                allPlayers.splice(index, 1);
            }
        }
    });

    socket.emit('init');
});

console.log('Listening on port', port);

