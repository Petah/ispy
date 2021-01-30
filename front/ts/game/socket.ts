import { IScope, ILocationService } from "angular";
import { Game } from "../../../common/entities/game";
import { Level } from "../../../common/entities/level";
import { Player } from "../../../common/entities/player";
import { CorrectGuess, CreatePlayer, Guess, IncorrectGuess, LevelStart, NoLife, PlayerJoined } from "../../../common/events/events";
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

        this.socket = io('http://192.168.1.9:3000');

        this.bind('init', (data) => {
        });

        this.bind('playerJoined', (playerJoined: PlayerJoined) => {
            const player = objectToInstance(playerJoined.player, new Player());
            // state.game.players.push(player);
        });

        this.bind('youJoined', (data) => {
            state.player.joined = true;
        });

        this.bind('levelStart', (levelStart: LevelStart) => {
            if (levelStart.game.id === state.game?.id) {
                state.game = objectToInstance(levelStart.game, new Game());
                state.level = objectToInstance(levelStart.game.level, new Level());
                this.goto('/round');
            }
        });

        this.bind('levelEnd', (data) => {
        });

        this.bind('guessingComplete', (data) => {
        });

        this.bind('gamesList', (data) => {
            state.gamesList = objectsToInstances(data, d => new Game());
        });

        this.bind('correctGuess', (correctGuess: CorrectGuess) => {
            state.game = objectToInstance(correctGuess.game, state.game);
            audio.play(correctGuess.clue.sound as any || 'found');
            console.log(correctGuess.clue)
            console.log(correctGuess.player)
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
        this.emit('joinGame', {
        });
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