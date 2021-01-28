import { IScope } from "angular";
import { state } from "../game/state";
import { IController } from "./controller";

interface IWelcomeControllerScope extends IScope {
    hasPlayer: boolean,
    player: { name: string },
    createPlayer(): Promise<boolean>,
}

export class WelcomeController implements IController {
    public inject = [
        '$scope',
    ];

    public controller(
        $scope: IWelcomeControllerScope,
    ) {
        $scope.hasPlayer = state.hasPlayer;
        $scope.player = { name: '' };

        $scope.createPlayer = async function (): Promise<boolean> {
            if (!$scope.player.name || !$scope.player.name.length) {
                alert('Please enter a valid name for yourself.');

                return;
            }

            state.createPlayer($scope.player.name);
            return true;
        };
    }
}
