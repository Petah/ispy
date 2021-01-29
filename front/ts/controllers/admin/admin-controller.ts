import { IHttpService, IScope } from "angular";
import { api } from "../../game/api";
import { IController } from "../controller";
import { Level } from "../../game/level";

interface IAdminControllerScope extends IScope {
}

export class AdminController implements IController {
    public inject = [
    ];

    public controller(
    ) {
    }
}
