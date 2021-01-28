import { IScope } from "angular";
import { Controller } from "./controller";

interface RootControllerScope extends IScope {
    test: string
}

export class RootController implements Controller {
    public inject = [
        '$scope',
    ];

    public controller(
        $scope: RootControllerScope,
    ) {
        $scope.test = 'This means angular is working';
    }
}
