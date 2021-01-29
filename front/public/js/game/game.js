"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const model_1 = require("../helpers/json-api/model");
class Game extends model_1.Model {
    constructor() {
        super(...arguments);
        this.level = null;
    }
    getLevel() {
        return null;
    }
    setLevel(level) {
        return null;
    }
}
exports.Game = Game;
