import { IHttpService, IScope } from "angular";
import { api } from "../game/api";
import { state } from "../game/state";
import { IController } from "./controller";

interface ICreateGameControllerScope extends IScope {
    gameName: string,
    playerName: string,
    createGame(): void,
}

export class CreateGameController implements IController {
    public inject = [
        '$scope',
        '$http',
    ];

    public controller(
        $scope: ICreateGameControllerScope,
        $http: IHttpService
    ) {
        $scope.createGame = async function (): Promise<void> {
            if (!$scope.gameName || !$scope.gameName.length) {
                alert('Please enter a valid name for your game room.');

                return;
            }

            console.log(`Creating game with room ${$scope.gameName}`);
            const game = api.createGame($scope.gameName);
            state.setGame(game);
            state.startGame();
        };
    }
}
