import { Model } from "../helpers/json-api/model";
import { Level } from "./level";
import { state } from "./state";

export interface IGameAttributes {
    name: string,
}

export class Game extends Model<IGameAttributes> {
    private level: Level = null;

    getLevel(): Level|null {
        return null;
    }

    setLevel(level: Level): void {
        return null;
    }
}