import { IScope } from "angular";
import { Controller } from "./controller";

interface RootControllerScope extends IScope {
}

export class RootController implements Controller {
    public inject = [
        '$scope',
    ];

    public controller(
        $scope: RootControllerScope,
    ) {
    }
}
