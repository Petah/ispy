import { Model, ModelConstructorArgs } from "../helpers/json-api/model";

export interface Point {
    x: number,
    y: number,
}

export declare type Path = Point[];

export class ClueItem {
    path: Path = []
}

export class Clue {
    text: string = ''
    items: ClueItem[] = []
}

export interface ILevelAttributes {
    name: string,
    riddle: string,
    image: string,
    thumbnail: string,
    clues: Clue[],
}

export class Level extends Model<ILevelAttributes> {

    constructor(args: ModelConstructorArgs<ILevelAttributes>) {
        super(args)
        this.attributes.clues = this.attributes.clues || []
    }

    getPathString(item: ClueItem): string {
        const d: string[] = [];
        for (const p of item.path) {
            if (d.length === 0) {
                d.push(`M ${p.x}, ${p.y}`);
            } else {
                d.push(`L ${p.x}, ${p.y}`);
            }
        }
        d.push('Z');
        return d.join(' ');
    }
}