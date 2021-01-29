"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelListController = void 0;
const api_1 = require("../../game/api");
const level_1 = require("../../game/level");
class LevelListController {
    constructor() {
        this.inject = [
            '$scope',
            '$http',
            '$routeParams',
        ];
    }
    controller($scope, $http, $routeParams) {
        $scope.fetchLevels = async () => {
            const response = await api_1.api.get('levels/list');
            $scope.levels = level_1.Level.mapModels(response);
            console.log(response);
        };
        $scope.fetchLevels();
    }
}
exports.LevelListController = LevelListController;
