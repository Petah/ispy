import { IModule } from "angular";
import { IController } from "./controllers/controller";
import { IDirective } from "./directives/directive";
import { IFactory } from "./factories/factory";
import { IFilter } from "./filters/filter";
import { IRoute } from "./routes";

export function loadDirective(app: IModule, directiveClass: new () => IDirective, name: string): void {
    const instance = new directiveClass();
    app.directive(name, [...instance.inject, function (...injected) {
        return {
            restrict: instance.restrict,
            scope: instance.scope,
            require: instance.require,
            template: instance.template,
            templateUrl: instance.templateUrl,
            link: instance.directive(...injected),
        };
    }]);
}

export function loadController(app: IModule, controllerClass: new () => IController, name: string): void {
    const instance = new controllerClass();
    app.controller(name, [...instance.inject, instance.controller]);
}

export function loadFactory(app: IModule, factoryClass: new () => IFactory, name: string): void {
    const instance = new factoryClass();
    app.factory(name, [...instance.inject, instance.factory]);
}

export function loadFilter(app: IModule, filterClass: new () => IFilter, name: string): void {
    const instance = new filterClass();
    app.filter(name, [...instance.inject, instance.filter]);
}

export function loadRoutes(app: IModule, routes: Array<IRoute>): void {
    for (const route of routes) {
        loadController(app, route.controller.handler, route.controller.name);
    }

    app.config([
        '$routeProvider',
        function ($routeProvider) {
            for (const route of routes) {
                $routeProvider.when(route.path, {
                    templateUrl: route.templateUrl,
                    controller: route.controller.name
                })
            }
        }
    ]);
}
