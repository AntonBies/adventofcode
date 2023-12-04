const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => [...row].map(Number));

const shortestPath = (map, startPos = [0, 0]) => {
    const ADJ = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];
    const queue = [{ pos: startPos, cost: 0 }];
    const visited = [];
    while (queue.length) {
        const {
            pos: [x, y],
            cost,
        } = queue.shift();
        if (y === map.length - 1 && x === map[0].length - 1) return cost;

        ADJ.map(([dx, dy]) => [dx + x, dy + y])
            .filter(([x, y]) => map[y]?.[x])
            .filter((pos) => visited.indexOf(`${pos}`) === -1)
            .forEach((pos) => {
                visited.push(`${pos}`);
                queue.push({ pos, cost: cost + map[pos[1]][pos[0]] });
            });
        queue.sort((a, b) => a.cost - b.cost);
    }
};

const largerMap = Array(5 * data.length)
    .fill(0)
    .map((_, y) => Array(5 * data.length).fill(0));

for (let i in largerMap) {
    for (let j in largerMap[i]) {
        if (data[i] && data[i][j]) {
            largerMap[i][j] = data[i][j];
        } else if (largerMap[i][j - data.length] > 0) {
            largerMap[i][j] = largerMap[i][j - data.length] + 1;
            if (largerMap[i][j] === 10) {
                largerMap[i][j] = 1;
            }
        } else if (largerMap[i - data.length][j] > 0) {
            largerMap[i][j] = largerMap[i - data.length][j] + 1;
            if (largerMap[i][j] === 10) {
                largerMap[i][j] = 1;
            }
        }
    }
}

console.log(shortestPath(data));
// console.log(shortestPath(largerMap));
