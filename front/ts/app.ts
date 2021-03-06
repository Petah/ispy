import 'babel-polyfill'
import { RootController } from './controllers/root-controller'
import { MessageBoxDirective } from './directives/message-box'
import { NgMagnifyDirective } from './directives/ng-magnify'
import { loadController, loadDirective, loadRoutes } from './loader'
import { Routes } from "./routes"

const app = angular.module('App', [
    'ngRoute',
]);

app.run(['$window', '$q', function ($window, $q) {
    $window.Promise = $q;
}]);

(window as any).app = app;

loadController(app, RootController, 'RootController');
loadDirective(app, MessageBoxDirective, 'gMessageBox');
loadDirective(app, NgMagnifyDirective, 'ngMagnify');
loadRoutes(app, Routes);