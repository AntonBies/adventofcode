const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((row) => [...row]);

function getInput() {
    const res = {
        start: {},
        end: {},
    };
    res.map = data.map((row, y) => {
        return row.map((value, x) => {
            if (value === "S") {
                res.start = {
                    y,
                    x,
                };
                return 1;
            }
            if (value === "E") {
                res.end = {
                    y,
                    x,
                };
                return 26;
            }
            return value.charCodeAt(0) - "a".charCodeAt(0) + 1;
        });
    });
    return res;
}

const shortestPath = (input) => {
    const ADJ = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];
    const startPos = [input.start.y, input.start.x];
    const queue = [{ pos: startPos, cost: 0 }];
    const visited = [`0,0`];
    while (queue.length) {
        const {
            pos: [y, x],
            cost,
        } = queue.shift();
        if (y === input.end.y && x === input.end.x) return cost;
        const current = input.map[y][x];
        ADJ.map(([dy, dx]) => [dy + y, dx + x])
            .filter(([y, x]) => input.map[y]?.[x])
            .filter(([y, x]) => input.map[y][x] - current < 2)
            .filter((pos) => visited.indexOf(`${pos}`) === -1)
            .forEach((pos) => {
                visited.push(`${pos}`);
                queue.push({ pos, cost: cost + 1 });
            });
        queue.sort((a, b) => a.cost - b.cost);
    }
};

const input = getInput();
console.log(shortestPath(input));

const shortestPathFromEnd = (input) => {
    const ADJ = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];
    const startPos = [input.end.y, input.end.x];
    const queue = [{ pos: startPos, cost: 0 }];
    const visited = [`${input.end.y},${input.end.x}`];
    while (queue.length) {
        const {
            pos: [y, x],
            cost,
        } = queue.shift();
        const current = input.map[y][x];
        if (current === 1) return cost;
        ADJ.map(([dy, dx]) => [dy + y, dx + x])
            .filter(([y, x]) => input.map[y]?.[x])
            .filter(([y, x]) => current - input.map[y][x] < 2)
            .filter((pos) => visited.indexOf(`${pos}`) === -1)
            .forEach((pos) => {
                visited.push(`${pos}`);
                queue.push({ pos, cost: cost + 1 });
            });
        queue.sort((a, b) => a.cost - b.cost);
    }
};

console.log(shortestPathFromEnd(input));
