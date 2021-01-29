import { IHttpService, IRootScopeService, IScope } from "angular";
import { api } from "../game/api";
import { state } from "../game/state";
import { IController } from "./controller";

interface IRootControllerScope extends IScope {
}

export class RootController implements IController {
    public inject = [
        '$rootScope',
        '$scope',
        '$http',
    ];

    public controller(
        $rootScope: any,
        $scope: IRootControllerScope,
        $http: IHttpService
    ) {
        $rootScope.state = state
        api.init($http);
    }
}
