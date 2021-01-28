import { Model } from "../helpers/json-api/model";

export interface IPlayerAttributes {
    name: string,
}

export class Player extends Model<IPlayerAttributes> {
}