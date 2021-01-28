import { IScope } from "angular";
import { IController } from "./controller";

interface IRootControllerScope extends IScope {
}

export class RootController implements IController {
    public inject = [
        '$scope',
    ];

    public controller(
        $scope: IRootControllerScope,
    ) {
    }
}
