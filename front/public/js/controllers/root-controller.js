"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = void 0;
const api_1 = require("../game/api");
const state_1 = require("../game/state");
class RootController {
    constructor() {
        this.inject = [
            '$rootScope',
            '$scope',
            '$http',
        ];
    }
    controller($rootScope, $scope, $http) {
        $rootScope.state = state_1.state;
        api_1.api.init($http);
    }
}
exports.RootController = RootController;
