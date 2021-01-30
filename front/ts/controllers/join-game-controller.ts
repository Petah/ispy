import { ILocationService, IScope } from "angular";
import { IController } from "./controller";
import { state } from "../game/state";
import { Game } from "../../../common/entities/game";
import { socket } from "../game/socket";
import { audio } from "../game/audio";

interface IJoinGameControllerScope extends IScope {
    games: Game[],
    isJoiningGame: boolean,
    joinGame(game: Game): Promise<void>,
}

export class JoinGameController implements IController {
    public inject = [
        '$location',
        '$scope',
    ];

    public controller(
        $location: ILocationService,
        $scope: IJoinGameControllerScope,
    ) {
        if (!state.player.joined) {
            $location.path('/');
            return;
        }

        $scope.isJoiningGame = false;

        // @Todo fetch games list

        $scope.joinGame = async function (game: Game): Promise<void> {
            console.log(`Joining game ${game.name}`);
            audio.play('bobadlelelele');
            socket.joinGame(game);
        };
    }
}
