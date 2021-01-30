import { ILocationService, IScope } from "angular";
import { IController } from "./controller";
import { state } from "../game/state";
import { Game } from "../../../common/entities/game";
import { socket } from "../game/socket";
import { audio } from "../game/audio";

interface IScoreboardControllerScope extends IScope { }

export class ScoreboardController implements IController {
    public inject = [
        '$location',
        '$scope',
    ];

    public controller(
        $location: ILocationService,
        $scope: IScoreboardControllerScope,
    ) {
    }
}
