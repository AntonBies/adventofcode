const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map(row => row.split(""));

const adj = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0,1],
    [1, 1],
    [1,0],
    [1, -1],
    [0,-1],
];

const part1 = data.reduce((acc, row, y) => {
    return acc + row.reduce((acc, cur, x) => {
        if (cur !== "@") return acc;
        return acc + (adj
                        .map(([dy, dx]) => [y + dy, x + dx])
                        .filter(([y, x]) => data[y]?.[x] === "@")
                        .length < 4 ? 1 : 0);
    }, 0);
}, 0);

console.log(part1);

const removeRolls = (grid) => {
    return grid.reduce((acc, row, y) => {
        return acc + row.reduce((acc, cur, x) => {
            if (cur !== "@") return acc;
            const neighbours = adj
                .map(([dy, dx]) => [y + dy, x + dx])
                .filter(([y, x]) => data[y]?.[x] === "@")
                .length;
            if (neighbours < 4) {
                grid[y][x] = "X";
                return acc + 1;
            }
            return acc;
        }, 0);
    }, 0);
}

const part2 = (grid) => {
    while (removeRolls(grid) !== 0) {
        continue;
    }
    const totalRolls = grid.reduce((acc, row) => {
        return acc + row.reduce((acc, cur) => acc + (cur === "X" ? 1 : 0), 0);
    }, 0);

    return totalRolls;
}

console.log(part2([...data]));