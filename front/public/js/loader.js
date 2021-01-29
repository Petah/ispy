"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRoutes = exports.loadFilter = exports.loadFactory = exports.loadController = exports.loadDirective = void 0;
function loadDirective(app, directiveClass, name) {
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
exports.loadDirective = loadDirective;
function loadController(app, controllerClass, name) {
    const instance = new controllerClass();
    app.controller(name, [...instance.inject, instance.controller]);
}
exports.loadController = loadController;
function loadFactory(app, factoryClass, name) {
    const instance = new factoryClass();
    app.factory(name, [...instance.inject, instance.factory]);
}
exports.loadFactory = loadFactory;
function loadFilter(app, filterClass, name) {
    const instance = new filterClass();
    app.filter(name, [...instance.inject, instance.filter]);
}
exports.loadFilter = loadFilter;
function loadRoutes(app, routes) {
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
                });
            }
            $routeProvider.otherwise({
                redirectTo: '/',
            });
        }
    ]);
}
exports.loadRoutes = loadRoutes;
