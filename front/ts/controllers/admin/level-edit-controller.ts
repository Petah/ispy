import { IHttpService, IScope } from "angular";
import { api } from "../../game/api";
import { IController } from "../controller";
import { Clue, ClueItem, Level } from "../../../../common/entities/level";
import { objectToInstance } from "../../../../common/helpers/object";

interface ILevelEditControllerScope extends IScope {
    level: Level,
    addClue(): void,
    currentClue: Clue,
    addItem(clue: Clue): void,
    removeItem(clue: Clue, item: ClueItem, $index: number): void,
    removeClue(clue: Clue, $index: number): void,
    selectItem(item: ClueItem): void,
    currentItem: ClueItem,
    save(): void
    fetchLevel(): Promise<void>
}

export class LevelEditController implements IController {
    public inject = [
        '$scope',
        '$http',
        '$routeParams',
    ];

    public controller(
        $scope: ILevelEditControllerScope,
        $http: IHttpService,
        $routeParams,
    ) {
        const levelData = require('../../../../../../../common/data/level.json');
        $scope.level = objectToInstance(levelData, new Level());
        // $scope.level = new LevelData();

        $scope.fetchLevel = async () => {
            console.log('fetchLevel');
            // const response = await api.get<JsonApiModel>(`levels/fetch/${$routeParams.id}`)
            // $scope.level = Level.mapModel(response);
            // console.log(response)
        }
        $scope.fetchLevel();

        $scope.addClue = () => {
            $scope.level.clues.push(new Clue())
            $scope.currentClue = $scope.level.clues[$scope.level.clues.length - 1];
            $scope.addItem($scope.currentClue);
        }

        $scope.removeClue = (clue, $index) => {
            $scope.level.clues.splice($index, 1);
        }

        $scope.addItem = (clue) => {
            clue.items.push(new ClueItem());
            $scope.currentItem = clue.items[clue.items.length - 1];
        }

        $scope.removeItem = (clue, item, $index) => {
            clue.items.splice($index, 1);
        }

        $scope.selectItem = (item: ClueItem) => {
            $scope.currentItem = item
            console.log('selectItem');
            svgPath.attr('d', $scope.level.getPathString($scope.currentItem));
        }

        $scope.save = async () => {
            console.log(JSON.stringify($scope.level, null, 4));
            navigator.clipboard.writeText(JSON.stringify($scope.level, null, 4));
            // console.log('save', $scope.level.id);
            // if ($scope.level.id) {
            //     const response = await api.post(`levels/edit/${$scope.level.id}`, {
            //         data: $scope.level,
            //     })
            //     console.log(response.data)
            // } else {
            //     const response = await api.post('levels/create', {
            //         data: $scope.level,
            //     })
            //     console.log(response.data)
            // }
        }

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
        })

        $('#gp-image-wrapper svg').on('mousemove', (event: any) => {
            // if (event.buttons !== undefined && event.buttons !== 1 && event.type != 'touchmove') {
            //     mouse.isDown = false;
            // }
            if (event.buttons !== undefined && event.buttons !== 1) {
                mouse.isDown = false;
            }

            if (mouse.isDown && $scope.currentItem) {
                const parentOffset = $('#gp-image-wrapper svg').parent().offset();
                const x = ((event.pageX || event.originalEvent.touches[0].pageX) - parentOffset.left) / $scope.level.width;
                const y = ((event.pageY || event.originalEvent.touches[0].pageY) - parentOffset.top) / $scope.level.height;
                $scope.currentItem.path.push({ x, y });
                svgPath.attr('d', $scope.level.getPathString($scope.currentItem));
                $scope.$apply();
            }
        });

        $('#gp-image-wrapper svg').on('mousedown', (event: any) => {
            event.preventDefault()
            mouse.isDown = true;
            if ($scope.currentItem) {
                $scope.currentItem.path = []
                $scope.$apply();
            }
        });

        $('#gp-image-wrapper svg').on('mouseup', (event) => {
            event.preventDefault()
        });
    }
}
