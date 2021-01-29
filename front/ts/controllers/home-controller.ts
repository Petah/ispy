import { IScope } from "angular";
import { IController } from "./controller";
import { api } from "../game/api";
import { state } from "../game/state";
import { Player } from "../game/player";

interface IHomeControllerScope extends IScope {
    hasPlayer: boolean,
    isCreatingPlayer: boolean,
    player: Player,
    createPlayer(): Promise<boolean>,
}

export class HomeController implements IController {
    public inject = [
        '$scope',
    ];

    public controller(
        $scope: IHomeControllerScope,
    ) {
        $scope.player = state.getPlayer() || new Player({
            id: '',
            type: 'Player',
            attributes: {
                name: ''
            }
        });

        $scope.isCreatingPlayer = false;

        $scope.createPlayer = async function (): Promise<boolean> {
            if (!$scope.player.attributes.name || !$scope.player.attributes.name.length) {
                alert('Please enter a valid name for yourself.');

                return;
            }

            $scope.isCreatingPlayer = true;
            try {
                const player = await api.createPlayer($scope.player.attributes.name);
                $scope.player.attributes.name = player.attributes.name;
                state.setPlayer(player);
            } catch(e) {
                console.error(e.message);
            }
            $scope.isCreatingPlayer = false;

            return true;
        };
    }
}
