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
    clickImage($event: MouseEvent): void
    start(): void
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

        setInterval(() => {
            $scope.$apply();
        }, 97);

        $scope.clickImage = ($event: MouseEvent) => {
            if (!state.game.started) {
                return;
            }

            const target = $($event.target);
            const xPos = $event.pageX - target.offset().left;
            const yPos = $event.pageY - target.offset().top;
            socket.guess(xPos / target.width(), yPos / target.height(), $event.pageX, $event.pageY);
        }

        $scope.start = () => {
            socket.startGame();
        }

        $scope.$on('socket', (event, data) => {
            switch (data.event) {
                case 'incorrectGuess':
                    console.log('$on', data);
                    break;
            }
        });

        $scope.leaveGame = function (): void {
            socket.leaveGame();
            $location.path('/');
        }
    }
}
