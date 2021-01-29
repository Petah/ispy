const data = require('./level.json');
data.clues = data.clues.map((clue) => {
    clue.items = clue.items.map((item) => {
        item.path = item.path.map((point) => {
            point.x = point.x / data.width;
            point.y = point.y / data.height;
            return point;
        });
        return item;
    })
    return clue;
})
process.stdout.write(JSON.stringify(data, null, 4) + "\n");