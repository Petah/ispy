import { ILocationService, IScope } from "angular";
import { IController } from "./controller";
import { api } from "../game/api";
import { state } from "../game/state";
import { Game } from "../../../common/entities/game";

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
            // try {
            //     console.log(`Joining game ${game.name}`);
            //     $scope.isJoiningGame = true;
            //     await api.joinGame(game);
            //     state.setGame(game);
            //     $location.path('/round');
            // } catch (e) {
            //     console.error(e.message);
            // }
            // $scope.isJoiningGame = false;
        };
    }
}
