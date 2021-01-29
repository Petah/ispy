import { ILocationService, IScope } from "angular";
import { IController } from "./controller";
import { state } from "../game/state";
import { Level } from "../../../common/entities/level";
import { Player } from "../../../common/entities/player";

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
        if (!state.player.joined) {
            console.log('Player not joined going home');
            $location.path('/');
            return;
        }

        // $scope.level = state.getLevel();

        // $scope.leaveGame = function (): void {
        //     if (!confirm('Are you sure you want to leave the round?')) {
        //         return;
        //     }

        //     state.setLevel(null);
        //     $location.path('/');
        // }
    }
}
