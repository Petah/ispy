import { IScope } from "angular";
import { IController } from "./controller";
import { api } from "../game/api";
import { state } from "../game/state";
import { socket } from "../game/socket";
import { Player } from "../../../common/entities/player";

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
        state.player.name = localStorage.getItem('playerName') || '';

        $scope.createPlayer = async (): Promise<void> => {
            if (!state.player.name || !state.player.name.length) {
                alert('Please enter a valid name for yourself.');
                return;
            }
            localStorage.setItem('playerName', state.player.name);
            socket.joinGame(state.player.name);
        };
    }
}
