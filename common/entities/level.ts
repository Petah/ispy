export class Level {
    public id: string;
    public name: string;
    public host: string;
    public image: string;
    public thumbnail: string;
    public riddle: string;
    public width: number;
    public height: number;
    public clues: Clue[] = [];

    public getPathString(item: ClueItem, width: number, height: number): string {
        const d: string[] = [];
        for (const p of item._path) {
            const x = p.x * width;
            const y = p.y * height;
            if (d.length === 0) {
                d.push(`M ${x}, ${y}`);
            } else {
                d.push(`L ${x}, ${y}`);
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
    _path: Path = []
}

export class Clue {
    text: string = ''
    sound: string = ''
    items: ClueItem[] = []
}
