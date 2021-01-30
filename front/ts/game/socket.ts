import { IScope, ILocationService } from "angular";
import { Game } from "../../../common/entities/game";
import { Level } from "../../../common/entities/level";
import { Player } from "../../../common/entities/player";
import { CorrectGuess, CreatePlayer, DuplicateGuess, Guess, IncorrectGuess, LevelStart, NoLife, PlayerJoined, JoinGame, JoinedGame, StartGame, LeaveGame, PlayerLeft, LevelEnd, GameFinished } from "../../../common/events/events";
import { objectsToInstances, objectToInstance } from "../../../common/helpers/object";
import { audio } from "./audio";
import { particles } from "./particles";
import { state } from "./state";

class Socket {
    private socket: SocketIOClient.Socket;
    private $rootScope: IScope;
    private $location: ILocationService;

    init($rootScope: IScope, $location: ILocationService) {
        this.$rootScope = $rootScope;
        this.$location = $location;

        this.socket = io();

        this.socket.on("disconnect", () => {
            alert('Lost connection to server')
            location.reload();
        });

        this.bind('init', (data) => {
        });

        this.bind('playerJoined', (playerJoined: PlayerJoined) => {
            const player = objectToInstance(playerJoined.player, new Player());
            // state.game.players.push(player);
        });

        this.bind('joinedGame', (joinedGame: JoinedGame) => {
            state.game = objectToInstance(joinedGame.game, new Game());
            if (state.player.name === joinedGame.player.name && joinedGame.player.host) {
                state.player.host = true;
            }
            // state.game.players.push(player);
            this.goto('/round');
        });

        this.bind('youJoined', (data) => {
            state.player.joined = true;
        });

        this.bind('levelStart', (levelStart: LevelStart) => {
            if (levelStart.game.id === state.game?.id) {
                state.game = objectToInstance(levelStart.game, new Game());
                state.level = objectToInstance(levelStart.game.level, new Level());
                state.clue = levelStart.clue;
                // this.goto('/round');
            }
        });

        this.bind('levelEnd', (levelEnd: LevelEnd) => {
            state.game = objectToInstance(levelEnd.game, new Game());
        });

        this.bind('gameFinished', (gameFinished: GameFinished) => {
            state.game = objectToInstance(gameFinished.game, new Game());
        });

        this.bind('playerLeft', (playerLeft: PlayerLeft) => {
            state.game = objectToInstance(playerLeft.game, new Game());
        });

        this.bind('guessingComplete', (data) => {
        });

        this.bind('gamesList', (data) => {
            state.gamesList = objectsToInstances(data, d => new Game());
        });

        this.bind('correctGuess', (correctGuess: CorrectGuess) => {
            state.game = objectToInstance(correctGuess.game, state.game);
            if (correctGuess.player.name === state.player.name) {
                audio.play(correctGuess.clue.sound as any || 'found');
                particles.burst('yes1', correctGuess.guess.pageX, correctGuess.guess.pageY, 'grow-shrink')
            }
        });

        this.bind('duplicateGuess', (duplicateGuess: DuplicateGuess) => {
            state.game = objectToInstance(duplicateGuess.game, state.game);
            if (duplicateGuess.player.name === state.player.name) {
                audio.play(duplicateGuess.clue.sound as any || 'found');
                particles.burst('dupe', duplicateGuess.guess.pageX, duplicateGuess.guess.pageY, 'grow-shrink')
            }
        });

        this.bind('incorrectGuess', (incorrectGuess: IncorrectGuess) => {
            state.game = objectToInstance(incorrectGuess.game, state.game);
            if (incorrectGuess.player.name === state.player.name) {
                audio.play('questionMark');
                particles.burst('questionMark', incorrectGuess.guess.pageX, incorrectGuess.guess.pageY, 'wobble')
            }
        });

        this.bind('noLife', (noLife: NoLife) => {
            audio.play('wrong');
            particles.burst('cross', noLife.guess.pageX, noLife.guess.pageY)
        });
    }

    public createPlayer(name: string) {
        const createPlayer: CreatePlayer = {
            name,
        };
        this.emit('createPlayer', createPlayer);
    }

    public joinGame(game: Game) {
        state.game = game;
        const joinGame: JoinGame = {
            game,
            player: state.player,
        };
        this.emit('joinGame', joinGame);
    }

    public startGame() {
        const startGame: StartGame = {
        };
        this.emit('startGame', startGame);
    }

    public leaveGame() {
        state.game = null;
        state.level = null;
        const leaveGame: LeaveGame = {
        };
        this.emit('leaveGame', leaveGame);
    }

    public guess(xPercent: number, yPercent: number, pageX: number, pageY: number) {
        const guess: Guess = {
            xPercent,
            yPercent,
            pageX,
            pageY,
        };
        this.emit('guess', guess);
    }

    private emit(event, data) {
        console.log('Socket emit', event, data)
        this.socket.emit(event, data);
    }

    private goto(route: string) {
        console.log('Going to', route);
        this.$location.path(route);
    }

    private bind(event: string, callback) {
        this.socket.on(event, (data) => {
            console.log('Socket received', event, data);
            callback(data);
            this.$rootScope.$broadcast('socket', {
                event,
                data,
            });
            this.$rootScope.$apply();
        });
    }
}

export const socket = new Socket();