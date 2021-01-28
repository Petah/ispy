import { IScope } from "angular";
import { IController } from "./controller";
import { api } from "../game/api";
import { state } from "../game/state";

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
        $scope.player = { name: '' };

        $scope.createPlayer = async function (): Promise<boolean> {
            if (!$scope.player.name || !$scope.player.name.length) {
                alert('Please enter a valid name for yourself.');

                return;
            }

            const player = await api.createPlayer($scope.player.name);
            state.setPlayer(player);

            return true;
        };
    }
}
