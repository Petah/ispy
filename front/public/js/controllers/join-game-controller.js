"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinGameController = void 0;
const api_1 = require("../game/api");
const state_1 = require("../game/state");
class JoinGameController {
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
        (async () => {
            $scope.games = (await api_1.api.getGames()).filter((game) => game.getLevel());
        })();
        $scope.isJoiningGame = false;
        $scope.joinGame = async function (game) {
            try {
                console.log(`Joining game ${game.attributes.name}`);
                $scope.isJoiningGame = true;
                await api_1.api.joinGame(game);
                state_1.state.setGame(game);
                $location.path('/round');
            }
            catch (e) {
                console.error(e.message);
            }
        };
        $scope.isJoiningGame = false;
    }
}
exports.JoinGameController = JoinGameController;
