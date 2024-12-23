const fs = require("fs");
const path = require("path");

const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];
const directionsLen = directions.length;
const turnClockwise = (i) => (i + 1 + directionsLen) % directionsLen;
const turnCounterClockwise = (i) => (i - 1 + directionsLen) % directionsLen;
const getNext = (dir) => {
    return [dir, turnClockwise(dir), turnCounterClockwise(dir)].map((dir) => ({
        delta: directions[dir],
        direction: dir,
    }));
};

const cheapestPaths = (grid, start) => {
    const queue = [{ loc: start, cost: 0, dir: 0, path: new Set([start]) }];
    const locDir = [start, 0].toString();
    const visited = { [locDir]: 0 };
    const paths = [];

    while (queue.length) {
        queue.sort((a, b) => a.cost - b.cost);
        const { loc, cost, dir, path } = queue.shift();
        if (paths.length && cost > paths[0].cost) return paths;
        const [y, x] = loc.split(",").map(Number);
        if (grid[y][x] === "E") paths.push({ loc, cost, dir, path });

        getNext(dir)
            .map(({ delta: [dy, dx], direction }) => ({
                loc: [y + dy, x + dx],
                direction,
            }))
            .forEach(({ loc: [y, x], direction }) => {
                if ([".", "E"].includes(grid[y]?.[x])) {
                    const location = [y, x].toString();
                    const newCost = direction === dir ? cost + 1 : cost + 1001;
                    const locDir = [location, direction].toString();
                    if (
                        (!visited[locDir] || newCost === visited[locDir]) &&
                        (paths.length === 0 || newCost <= paths[0].cost)
                    ) {
                        visited[locDir] = newCost;
                        queue.push({
                            loc: location,
                            cost: newCost,
                            dir: direction,
                            path: new Set([...path, location]),
                        });
                    }
                }
            });
    }
};

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split(""));

const S = data.reduce(
    (acc, row, y) => {
        if (acc[1] > -1) return acc;
        return [y, row.findIndex((x) => x === "S")];
    },
    [-1, -1]
);

((input) => {
    const paths = cheapestPaths(input, S.toString());
    console.log(paths[0].cost);
    let tiles = new Set();
    paths.forEach((obj) => {
        tiles = new Set([...tiles, ...obj.path]);
    });
    console.log(tiles.size);
})(data);
