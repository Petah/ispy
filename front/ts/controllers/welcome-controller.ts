import { IScope } from "angular";
import { IController } from "./controller";

interface IWelcomeControllerScope extends IScope {
    message: string,
}

export class WelcomeController implements IController {
    public inject = [
        '$scope',
    ];

    public controller(
        $scope: IWelcomeControllerScope,
    ) {
        $scope.message = 'iSpy 2021 - COVID-Free Edition';
        console.log(`You're in WelcomeController!`);
    }
}
