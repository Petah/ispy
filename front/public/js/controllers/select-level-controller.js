"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectLevelController = void 0;
const api_1 = require("../game/api");
const state_1 = require("../game/state");
class SelectLevelController {
    constructor() {
        this.inject = [
            '$location',
            '$scope',
        ];
    }
    controller($location, $scope) {
        if (!state_1.state.validateGame()) {
            $location.path('/');
            return;
        }
        (async () => {
            const level = await api_1.api.getLevel('17c69238-fd2e-430d-afdf-0b38d8c3fd14');
            $scope.levels = [
                level
            ];
        })();
        $scope.selectLevel = function (level) {
            $scope.selectedLevel = level;
            state_1.state.setLevel(level);
            $location.path('/round');
        };
    }
}
exports.SelectLevelController = SelectLevelController;
