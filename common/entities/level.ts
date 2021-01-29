export class Level {
    public id: string;
    public name: string;
    public host: string;
    public image: string;
    public thumbnail: string;
    public riddle: string;
    public clues: Clue[] = [];

    public getPathString(item: ClueItem): string {
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
