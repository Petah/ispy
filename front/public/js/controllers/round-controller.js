"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundController = void 0;
const state_1 = require("../game/state");
class RoundController {
    constructor() {
        this.inject = [
            '$location',
            '$scope',
        ];
    }
    controller($location, $scope) {
        if (!state_1.state.validateLevel()) {
            $location.path('/');
            return;
        }
        $scope.level = state_1.state.getLevel();
        $scope.leaveGame = function () {
            if (!confirm('Are you sure you want to leave the round?')) {
                return;
            }
            state_1.state.setLevel(null);
            $location.path('/');
        };
    }
}
exports.RoundController = RoundController;
