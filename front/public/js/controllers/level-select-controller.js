"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelSelectController = void 0;
const state_1 = require("../game/state");
const level_1 = require("../game/level");
class LevelSelectController {
    constructor() {
        this.inject = [
            '$scope',
        ];
    }
    controller($scope) {
        $scope.levels = [
            new level_1.Level({
                id: '1',
                type: 'Level',
                attributes: {
                    name: 'Watermelon',
                }
            }),
            new level_1.Level({
                id: '2',
                type: 'Level',
                attributes: {
                    name: 'Blueberry',
                }
            }),
        ];
        $scope.selectLevel = function (level) {
            $scope.selectedLevel = level;
            state_1.state.setLevel(level);
        };
    }
}
exports.LevelSelectController = LevelSelectController;
