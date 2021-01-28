import { IHttpService, IScope } from "angular";
import { state } from "../game/state";
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
        state.init($http);
    }
}
