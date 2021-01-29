import 'babel-polyfill'
import { RootController } from './controllers/root-controller'
import { MessageBoxDirective } from './directives/message-box'
import { JsonApi } from './helpers/json-api'
import { loadController, loadDirective, loadRoutes } from './loader'
import { Routes } from "./routes"

const app = angular.module('App', [
    'ngRoute'
]);

app.run(['$window', '$q', function ($window, $q) {
    $window.Promise = $q;
}]);

(window as any).app = app;
(window as any).JsonApi = JsonApi;

loadController(app, RootController, 'RootController');
loadDirective(app, MessageBoxDirective, 'gMessageBox');
loadRoutes(app, Routes);