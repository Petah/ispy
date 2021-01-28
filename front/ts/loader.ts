import { IModule } from "angular";
import { Controller } from "./controllers/controller";
import { Directive } from "./directives/directive";
import { Factory } from "./factories/factory";
import { Filter } from "./filters/filter";
import { Route } from "./routes";

export function loadDirective(app: IModule, directiveClass: new () => Directive, name: string): void {
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

export function loadController(app: IModule, controllerClass: new () => Controller, name: string): void {
    const instance = new controllerClass();
    app.controller(name, [...instance.inject, instance.controller]);
}

export function loadFactory(app: IModule, factoryClass: new () => Factory, name: string): void {
    const instance = new factoryClass();
    app.factory(name, [...instance.inject, instance.factory]);
}

export function loadFilter(app: IModule, filterClass: new () => Filter, name: string): void {
    const instance = new filterClass();
    app.filter(name, [...instance.inject, instance.filter]);
}

export function loadRoutes(app: IModule, routes: Array<Route>): void {
    for (const route of routes) {
        loadController(app, route.controller, route.controllerClass)
    }
    app.config([
        '$routeProvider',
        function ($routeProvider) {
            for (const route of routes) {
                $routeProvider.when(route.path, {
                    template: route.template,
                    controller: route.controllerClass
                })
            }
        }
    ]);
}
