import { Model } from "../helpers/json-api/model";

export interface ILevelAttributes {
    name: string,
}

export class Level extends Model<ILevelAttributes> {
}