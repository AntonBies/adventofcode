const fs = require("fs");
const path = require("path");

const ADJ = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split(""));

const start = data.reduce(
    (acc, row, y) => {
        const start = row.findIndex((loc) => loc === "S");
        if (start === -1) return acc;
        return [y, start];
    },
    [-1, -1]
);

const fullRoute = ((grid, start) => {
    const loc = start.toString();
    const queue = [{ loc, path: [loc], len: 0 }];
    const visited = new Set([loc]);

    while (queue.length) {
        const { loc, path, len } = queue.shift();
        const [y, x] = loc.split(",").map(Number);

        if (grid[y][x] === "E") return { loc, path, len };

        ADJ.map(([dy, dx]) => [y + dy, x + dx])
            .filter(
                ([y, x]) =>
                    !visited.has([y, x].toString()) && grid[y]?.[x] !== "#"
            )
            .forEach(([y, x]) => {
                const newLoc = [y, x].toString();
                const newPath = path.concat(newLoc);
                const newLen = len + 1;
                visited.add(newLoc);
                queue.push({ loc: newLoc, path: newPath, len: newLen });
            });
        queue.sort((a, b) => b.len - a.len);
    }
})(data, start);

const partone = (example) => {
    const findCheats = (grid, { path }) => {
        const cheats = {};
        for (let i in path) {
            const loc = path[i];
            const [y, x] = loc.split(",").map(Number);

            ADJ.map(([dy, dx]) => [y + 2 * dy, x + 2 * dx])
                .filter(
                    ([y, x]) =>
                        grid[y]?.[x] !== "#" &&
                        path.indexOf([y, x].toString()) - i >
                            (example ? 2 : 101)
                )
                .forEach(([y, x]) => {
                    const cheatEnd = [y, x].toString();
                    const timeSaved = path.indexOf(cheatEnd) - i - 2;
                    cheats[timeSaved] = cheats[timeSaved] || [];
                    cheats[timeSaved].push([loc, cheatEnd].join("|"));
                });
        }
        return cheats;
    };

    const cheats = findCheats(data, fullRoute);
    console.log(
        Object.keys(cheats).reduce((acc, cur) => acc + cheats[cur].length, 0)
    );
};

const parttwo = (example) => {
    const findCheats = (grid, { path }) => {
        const cheats = {};
        for (let i in path) {
            const loc = path[i];
            const [y, x] = loc.split(",").map(Number);

            for (let j = -20; j < 21; j++) {
                for (let k = -20; k < 21; k++) {
                    const steps = Math.abs(j) + Math.abs(k);
                    if (steps > 20 || steps < 2) continue;
                    const [ny, nx] = [y + j, x + k];
                    if ([".", "E"].indexOf(grid[ny]?.[nx]) === -1) continue;
                    const newLoc = [ny, nx].toString();
                    const timeSaved = path.indexOf(newLoc) - i - steps;
                    if (timeSaved > (example ? 49 : 99)) {
                        cheats[timeSaved] = cheats[timeSaved] || [];
                        cheats[timeSaved].push([loc, newLoc].join("|"));
                    }
                }
            }
        }
        return cheats;
    };

    const cheats = findCheats(data, fullRoute);
    console.log(
        Object.keys(cheats).reduce((acc, cur) => acc + cheats[cur].length, 0)
    );
};

const example = false;
partone(example);
parttwo(example);
