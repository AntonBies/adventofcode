const fs = require("fs");
const path = require("path");

const directions = {
    "^": [-1, 0],
    ">": [0, 1],
    v: [1, 0],
    "<": [0, -1],
};

const mappingTable = {
    "#": ["#", "#"],
    O: ["[", "]"],
    ".": [".", "."],
    "@": ["@", "."],
};

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n\n")
    .map((part) => part.split("\n"));

const movements = data[1].join("");

const partone = () => {
    const grid = data[0].map((row) => row.split(""));

    const move = ([y, x], [dy, dx]) => {
        const [ny, nx] = [y + dy, x + dx];
        if (grid[ny]?.[nx] === "#") return false;
        if (grid[ny]?.[nx] === ".") {
            [grid[ny][nx], grid[y][x]] = [grid[y][x], grid[ny][nx]];
            return true;
        }
        if (grid[ny]?.[nx] === "O") {
            if (move([ny, nx], [dy, dx])) {
                [grid[ny][nx], grid[y][x]] = [grid[y][x], grid[ny][nx]];
                return true;
            }
        }
    };

    const robot = grid.reduce(
        (acc, cur, y) => {
            if (acc[1] > -1) return acc;
            const x = cur.findIndex((el) => el === "@");
            return [y, x];
        },
        [-1, -1]
    );

    let cur = robot;
    for (let dir of movements) {
        const [dy, dx] = directions[dir];
        if (move(cur, [dy, dx])) {
            const [y, x] = cur;
            cur = [y + dy, x + dx];
        }
    }

    const score = grid.reduce(
        (acc, row, y) =>
            acc +
            row.reduce((acc, cur, x) => {
                return acc + (cur === "O" ? 100 * y + x : 0);
            }, 0),
        0
    );

    console.log(score);
};

const parttwo = () => {
    const grid = data[0].map((row) =>
        row.split("").flatMap((char) => mappingTable[char])
    );

    const move = ([dy, dx], queue) => {
        const hitWall = queue.some(([y, x]) => {
            const [ny, nx] = [y + dy, x + dx];
            return grid[ny]?.[nx] === "#";
        });
        if (hitWall) return false;
        if (dy === 0) {
            const [y, x] = queue.shift();
            const [ny, nx] = [y + dy, x + dx];
            if (grid[ny]?.[nx] === ".") {
                [grid[ny][nx], grid[y][x]] = [grid[y][x], grid[ny][nx]];
                return true;
            } else {
                if (move([dy, dx], [[ny, nx]])) {
                    [grid[ny][nx], grid[y][x]] = [grid[y][x], grid[ny][nx]];
                    return true;
                }
            }
            return false;
        }
        if (
            queue.every(([y, x]) => {
                const [ny, nx] = [y + dy, x + dx];
                return grid[ny]?.[nx] === ".";
            })
        ) {
            queue.forEach(([y, x]) => {
                const [ny, nx] = [y + dy, x + dx];
                [grid[ny][nx], grid[y][x]] = [grid[y][x], grid[ny][nx]];
            });
            return true;
        }
        const nextQueue = Array.from(
            new Set(
                queue.flatMap(([y, x]) => {
                    const [ny, nx] = [y + dy, x + dx];
                    if (grid[ny]?.[nx] === ".") return [];
                    if (grid[ny]?.[nx] === "[")
                        return [[ny, nx].toString(), [ny, nx + 1].toString()];
                    if (grid[ny]?.[nx] === "]")
                        return [[ny, nx - 1].toString(), [ny, nx].toString()];
                })
            )
        ).map((loc) => loc.split(",").map(Number));
        if (move([dy, dx], nextQueue)) {
            queue.forEach(([y, x]) => {
                const [ny, nx] = [y + dy, x + dx];
                [grid[ny][nx], grid[y][x]] = [grid[y][x], grid[ny][nx]];
            });
            return true;
        }
        return false;
    };

    const robot = grid.reduce(
        (acc, cur, y) => {
            if (acc[1] > -1) return acc;
            const x = cur.findIndex((el) => el === "@");
            return [y, x];
        },
        [-1, -1]
    );

    let cur = robot;
    for (let dir of movements) {
        const [dy, dx] = directions[dir];
        if (move([dy, dx], [cur])) {
            const [y, x] = cur;
            cur = [y + dy, x + dx];
        }
    }

    const score = grid.reduce(
        (acc, row, y) =>
            acc +
            row.reduce((acc, cur, x) => {
                return acc + (cur === "[" ? 100 * y + x : 0);
            }, 0),
        0
    );

    console.log(score);
};

partone();
parttwo();
