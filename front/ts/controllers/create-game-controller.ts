import { IScope } from "angular";
import { IController } from "./controller";

interface ICreateGameControllerScope extends IScope {
    roomName: string,
    createGame(): void,
}

export class CreateGameController implements IController {
    public inject = [
        '$scope',
        '$http',
    ];

    public controller(
        $scope: ICreateGameControllerScope,
    ) {
        $scope.createGame = function () {
            if (!$scope.roomName || !$scope.roomName.length) {
                alert('Please enter a valid name for your game room.');

                return;
            }

            console.log(`Creating game with room ${$scope.roomName}`);
        };
    }
}
