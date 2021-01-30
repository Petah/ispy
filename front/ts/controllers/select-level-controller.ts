import { ILocationService, IScope } from "angular";
import { IController } from "./controller";
import { state } from "../game/state";
import { Level } from "../../../common/entities/level";

interface ISelectLevelControllerScope extends IScope {
    levels: Level[],
    selectedLevel: Level,
    selectLevel(level: Level): void,
}

export class SelectLevelController implements IController {
    public inject = [
        '$location',
        '$scope',
    ];

    public controller(
        $location: ILocationService,
        $scope: ISelectLevelControllerScope,
    ) {
        if (!state.player.joined) {
            $location.path('/');
            return;
        }

        // (async () => {
        //     const level: Level = await api.getLevel('17c69238-fd2e-430d-afdf-0b38d8c3fd14');
        //     $scope.levels = [
        //         level
        //     ];
        // })();

        $scope.selectLevel = function (level: Level): void {
            $scope.selectedLevel = level;
            // state.setLevel(level);
            $location.path('/round');
        };
    }
}
