import { IScope } from "angular";
import { Controller } from "./controller";

interface WelcomeControllerScope extends IScope {
    message: string,
}

export class WelcomeController implements Controller {
    public inject = [
        '$scope',
    ];

    public controller(
        $scope: WelcomeControllerScope,
    ) {
        $scope.message = 'iSpy 2021 - COVID-Free Edition';
        console.log(`You're in WelcomeController!`);
    }
}
