"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelEditController = void 0;
const api_1 = require("../../game/api");
const level_1 = require("../../game/level");
class LevelEditController {
    constructor() {
        this.inject = [
            '$scope',
            '$http',
            '$routeParams',
        ];
    }
    controller($scope, $http, $routeParams) {
        console.log('routeParams', $routeParams.id);
        $scope.fetchLevel = async () => {
            console.log('fetchLevel');
            const response = await api_1.api.get(`levels/fetch/${$routeParams.id}`);
            $scope.level = level_1.Level.mapModel(response);
            console.log(response);
        };
        $scope.fetchLevel();
        $scope.addClue = () => {
            $scope.level.attributes.clues.push(new level_1.Clue());
            $scope.currentClue = $scope.level.attributes.clues[$scope.level.attributes.clues.length - 1];
            $scope.addItem($scope.currentClue);
        };
        $scope.addItem = (clue) => {
            clue.items.push(new level_1.ClueItem());
            $scope.currentItem = clue.items[clue.items.length - 1];
        };
        $scope.save = async () => {
            console.log('save', $scope.level.id);
            if ($scope.level.id) {
                const response = await api_1.api.post(`levels/edit/${$scope.level.id}`, {
                    data: $scope.level,
                });
                console.log(response.data);
            }
            else {
                const response = await api_1.api.post('levels/create', {
                    data: $scope.level,
                });
                console.log(response.data);
            }
        };
        const mouse = {
            isDown: false,
            x: null,
            y: null
        };
        const svg = $('#gp-image-wrapper svg');
        const image = $('#gp-image-wrapper img');
        const svgPath = $('#gp-image-wrapper svg path');
        image.on('load', () => {
            svg.width(image.width());
            svg.height(image.height());
            console.log(image.width());
        });
        $('#gp-image-wrapper svg').on('mousemove', (event) => {
            if (event.buttons !== undefined && event.buttons !== 1) {
                mouse.isDown = false;
            }
            if (mouse.isDown && $scope.currentItem) {
                const parentOffset = $('#gp-image-wrapper svg').parent().offset();
                const x = (event.pageX || event.originalEvent.touches[0].pageX) - parentOffset.left;
                const y = (event.pageY || event.originalEvent.touches[0].pageY) - parentOffset.top;
                $scope.currentItem.path.push({ x, y });
                svgPath.attr('d', $scope.level.getPathString($scope.currentItem));
                $scope.$apply();
            }
        });
        $('#gp-image-wrapper svg').on('mousedown', (event) => {
            event.preventDefault();
            mouse.isDown = true;
            if ($scope.currentItem) {
                $scope.currentItem.path = [];
                $scope.$apply();
            }
        });
        $('#gp-image-wrapper svg').on('mouseup', (event) => {
            event.preventDefault();
        });
    }
}
exports.LevelEditController = LevelEditController;
