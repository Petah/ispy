import { ILocationService, IScope } from "angular";
import { IController } from "./controller";
import { state } from "../game/state";
import { Level } from "../../../common/entities/level";
import { Player } from "../../../common/entities/player";
import { socket } from "../game/socket";

interface IRoundControllerScope extends IScope {
    level: Level,
    leaveGame(): void,
    players: Player[]
    click($event): void
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

        $scope.click = ($event: MouseEvent) => {
            const target = $($event.target);
            var xPos = $event.pageX - target.offset().left;
            var yPos = $event.pageY - target.offset().top;
            socket.guess(xPos / target.width(), yPos / target.height());
        }

        $scope.leaveGame = function (): void {
            if (!confirm('Are you sure you want to leave the round?')) {
                return;
            }

            state.setLevel(null);
            $location.path('/');
        }
    }
}
