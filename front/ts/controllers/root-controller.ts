import { IHttpService, ILocationService, IRootScopeService, IScope } from "angular";
import { audio } from "../game/audio";
import { socket } from "../game/socket";
import { state } from "../game/state";
import { IController } from "./controller";

interface IRootControllerScope extends IScope {
}

export class RootController implements IController {
    public inject = [
        '$rootScope',
        '$scope',
        '$http',
        '$location',
    ];

    public controller(
        $rootScope: any,
        $scope: IRootControllerScope,
        $http: IHttpService,
        $location: ILocationService,
    ) {
        $rootScope.state = state
        $rootScope.audio = audio
        socket.init($rootScope, $location);
    }
}
