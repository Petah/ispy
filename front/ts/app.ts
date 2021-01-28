import 'babel-polyfill';
import { RootController } from './controllers/root-controller';
import { JsonApi } from './helpers/json-api';
import { loadController } from './loader';

const app = angular.module('App', [
]);

(window as any).app = app;
(window as any).JsonApi = JsonApi;

loadController(app, RootController, 'RootController');