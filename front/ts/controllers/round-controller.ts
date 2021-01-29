import { ILocationService, IScope } from "angular";
import { IController } from "./controller";
import { Level } from "../game/level";
import { Player } from "../game/player";
import { state } from "../game/state";

interface IRoundControllerScope extends IScope {
    level: Level,
    leaveGame(): void,
    players: Player[]
}

export class RoundController implements IController {
    public inject = [
        '$location',
        '$scope',
    ];

    public controller(
        $location: ILocationService,
        $scope: IRoundControllerScope,
    ) {
        if (!state.validateLevel()) {
            $location.path('/');

            return;
        }

        $scope.level = state.getLevel();

        $scope.leaveGame = function (): void {
            if (!confirm('Are you sure you want to leave the round?')) {
                return;
            }

            state.setLevel(null);
            $location.path('/');
        }
    }
}
