import { ILocationService, IScope } from "angular";
import { IController } from "./controller";
import { api } from "../game/api";
import { state } from "../game/state";
import { Level } from "../game/level";

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
        if (!state.validateGame()) {
            $location.path('/');

            return;
        }

        // @Todo fetch levels from API
        $scope.levels = [
            new Level({
                id: '1',
                type: 'Level',
                attributes: {
                    name: 'Watermelon',
                }
            }),
            new Level({
                id: '2',
                type: 'Level',
                attributes: {
                    name: 'Blueberry',
                }
            }),
        ];

        $scope.selectLevel = function (level: Level): void {
            $scope.selectedLevel = level;
            state.setLevel(level);
            $location.path('/round');
        };
    }
}
