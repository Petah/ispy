"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Level = exports.Clue = exports.ClueItem = void 0;
const model_1 = require("../helpers/json-api/model");
class ClueItem {
    constructor() {
        this.path = [];
    }
}
exports.ClueItem = ClueItem;
class Clue {
    constructor() {
        this.text = '';
        this.items = [];
    }
}
exports.Clue = Clue;
class Level extends model_1.Model {
    constructor(args) {
        super(args);
        this.attributes.clues = this.attributes.clues || [];
    }
    getPathString(item) {
        const d = [];
        for (const p of item.path) {
            if (d.length === 0) {
                d.push(`M ${p.x}, ${p.y}`);
            }
            else {
                d.push(`L ${p.x}, ${p.y}`);
            }
        }
        d.push('Z');
        return d.join(' ');
    }
}
exports.Level = Level;
