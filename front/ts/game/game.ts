import { Model } from "../helpers/json-api/model";

export interface IGameAttributes {
    name: string,
}

export class Game extends Model<IGameAttributes> {
}