"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGameController = void 0;
const api_1 = require("../game/api");
const state_1 = require("../game/state");
class CreateGameController {
    constructor() {
        this.inject = [
            '$location',
            '$scope',
        ];
    }
    controller($location, $scope) {
        if (!state_1.state.hasPlayer) {
            $location.path('/');
            return;
        }
        $scope.isCreatingGame = false;
        $scope.createGame = async function () {
            if (!$scope.gameName || !$scope.gameName.length) {
                return;
            }
            $scope.isCreatingGame = true;
            try {
                console.log(`Creating game with room ${$scope.gameName}`);
                const game = await api_1.api.createGame($scope.gameName);
                state_1.state.setGame(game);
                state_1.state.startGame();
                $location.path('/select-level');
            }
            catch (e) {
                console.error(e.message);
            }
            $scope.isCreatingGame = false;
        };
    }
}
exports.CreateGameController = CreateGameController;
