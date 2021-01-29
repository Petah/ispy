import 'babel-polyfill'
import { RootController } from './controllers/root-controller'
import { loadController, loadRoutes } from './loader'
import { Routes } from "./routes"

const app = angular.module('App', [
    'ngRoute'
]);

app.run(['$window', '$q', function ($window, $q) {
    $window.Promise = $q;
}]);

(window as any).app = app;

loadController(app, RootController, 'RootController');
loadRoutes(app, Routes);