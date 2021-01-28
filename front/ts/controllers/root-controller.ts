import { IHttpService, IScope } from "angular";
import { api } from "../game/api";
import { IController } from "./controller";

interface IRootControllerScope extends IScope {
}

export class RootController implements IController {
    public inject = [
        '$scope',
        '$http',
    ];

    public controller(
        $scope: IRootControllerScope,
        $http: IHttpService
    ) {
        api.init($http);
    }
}
