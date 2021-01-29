"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const api_1 = require("../game/api");
const state_1 = require("../game/state");
const player_1 = require("../game/player");
class HomeController {
    constructor() {
        this.inject = [
            '$scope',
        ];
    }
    controller($scope) {
        $scope.player = state_1.state.getPlayer() || new player_1.Player({
            id: '',
            type: 'Player',
            attributes: {
                name: ''
            }
        });
        $scope.isCreatingPlayer = false;
        $scope.createPlayer = async function () {
            if (!$scope.player.attributes.name || !$scope.player.attributes.name.length) {
                alert('Please enter a valid name for yourself.');
                return;
            }
            $scope.isCreatingPlayer = true;
            try {
                const player = await api_1.api.createPlayer($scope.player.attributes.name);
                $scope.player.attributes.name = player.attributes.name;
                state_1.state.setPlayer(player);
            }
            catch (e) {
                console.error(e.message);
            }
            $scope.isCreatingPlayer = false;
            return true;
        };
    }
}
exports.HomeController = HomeController;
