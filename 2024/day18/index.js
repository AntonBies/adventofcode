const fs = require("fs");
const path = require("path");

const ADJ = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
];

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((coor) => coor.split(",").map(Number));

const bfs = (grid) => {
    const start = [0, 0].toString();
    const end = [grid.length - 1, grid[0].length - 1].toString();
    const queue = [{ loc: start, steps: 0, path: [start] }];
    const visited = new Set([start]);

    while (queue.length) {
        const { loc, steps, path } = queue.shift();
        if (loc === end) return { loc, steps, path };
        const [y, x] = loc.split(",").map(Number);

        ADJ.map(([dy, dx]) => [y + dy, x + dx])
            .filter(
                ([y, x]) =>
                    grid[y]?.[x] === "." && !visited.has([y, x].toString())
            )
            .forEach(([y, x]) => {
                const loc = [y, x].toString();
                const nextStep = steps + 1;
                visited.add(loc);
                queue.push({ loc, steps: nextStep, path: [...path, loc] });
            });
    }
    return "N/A";
};

const partone = (length, bytes) => {
    const grid = new Array(length)
        .fill(0)
        .map((row) => new Array(length).fill("."));
    for (let i = 0; i < bytes; i++) {
        grid[data[i][1]][data[i][0]] = "#";
    }

    let route = bfs(grid);

    let i = bytes;
    while (route !== "N/A") {
        const [y, x] = [data[i][1], data[i][0]];
        const loc = [y, x].toString();
        grid[y][x] = "#";
        if (route.path.indexOf(loc) > -1) {
            route = bfs(grid);
        }
        i++;
    }
    console.log(data[i - 1].toString());
};

partone(71, 1024);
