import { IScope } from "angular";
import { IController } from "./controller";
import { state } from "../game/state";
import { socket } from "../game/socket";
import { audio } from "../game/audio";
import { particles } from "../game/particles";

interface IHomeControllerScope extends IScope {
    isCreatingPlayer: boolean,
    createPlayer(): Promise<void>,
}

export class HomeController implements IController {
    public inject = [
        '$scope',
    ];

    public controller(
        $scope: IHomeControllerScope,
    ) {
        state.player.name = state.player.name
            || (localStorage.getItem('playerName') || '');

        $scope.createPlayer = async (): Promise<void> => {
            audio.play('spyMusic');
            if (!state.player.name || !state.player.name.length) {
                alert('Please enter a valid name for yourself.');
                return;
            }

            localStorage.setItem('playerName', state.player.name);
            socket.createPlayer(state.player.name);
        };
    }
}
