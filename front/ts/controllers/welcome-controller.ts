import { IScope } from "angular";
import { IController } from "./controller";

interface IWelcomeControllerScope extends IScope {
}

export class WelcomeController implements IController {
    public inject = [
        '$scope',
    ];

    public controller(
        $scope: IWelcomeControllerScope,
    ) {
    }
}
