import { IHttpService, IScope } from "angular";
import { api } from "../../game/api";
import { IController } from "../controller";
import { Level } from "../../../../common/entities/level";

interface ILevelListControllerScope extends IScope {
    levels: Level[],
    fetchLevels(): Promise<void>
}

export class LevelListController implements IController {
    public inject = [
        '$scope',
        '$http',
        '$routeParams',
    ];

    public controller(
        $scope: ILevelListControllerScope,
        $http: IHttpService,
        $routeParams,
    ) {
        $scope.fetchLevels = async () => {
            // const response = await api.get<JsonApiModel[]>('levels/list')
            // $scope.levels = Level.mapModels(response);
            // console.log(response);
        }
        $scope.fetchLevels();
    }
}
