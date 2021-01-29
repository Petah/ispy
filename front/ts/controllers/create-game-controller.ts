import { ILocationService, IScope } from "angular";
import { IController } from "./controller";
import { api } from "../game/api";
import { state } from "../game/state";

interface ICreateGameControllerScope extends IScope {
    gameName: string,
    isCreatingGame: boolean,
    playerName: string,
    createGame(): void,
}

export class CreateGameController implements IController {
    public inject = [
        '$location',
        '$scope',
    ];

    public controller(
        $location: ILocationService,
        $scope: ICreateGameControllerScope,
    ) {
        // if (!state.hasPlayer) {
        //     $location.path('/');

        //     return;
        // }

        $scope.isCreatingGame = false;

        $scope.createGame = async function (): Promise<void> {
            if (!$scope.gameName || !$scope.gameName.length) {
                return;
            }

            $scope.isCreatingGame = true;
            try {
                console.log(`Creating game with room ${$scope.gameName}`);
                const game = await api.createGame($scope.gameName);
                state.setGame(game);
                state.startGame();
                $location.path('/select-level');
            } catch (e) {
                console.error(e.message);
            }
            $scope.isCreatingGame = false;
        };
    }
}
