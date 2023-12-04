const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((row) => row.split("->").map((point) => point.split(",").map(Number)));

const drawLine = ([ax, ay], [bx, by], obj) => {
    const minx = Math.min(ax, bx);
    const maxx = Math.max(ax, bx);
    const miny = Math.min(ay, by);
    const maxy = Math.max(ay, by);
    for (let x = minx; x <= maxx; x++) {
        for (let y = miny; y <= maxy; y++) {
            obj[`${x},${y}`] = "#";
        }
    }
    return obj;
};

const cave = data.reduce((acc, cur) => {
    for (let i = 1; i < cur.length; i++) {
        acc = drawLine(cur[i - 1], cur[i], acc);
    }
    return acc;
}, {});

const bottom = Math.max(
    ...Object.keys(cave).map((point) => {
        return Number(point.split(",")[1]);
    })
);

const addSand = (cave, [x, y]) => {
    if (y > bottom) return false;
    while (!cave[`${x},${y + 1}`] && y <= bottom) {
        y++;
    }
    if (!cave[`${x - 1},${y + 1}`]) return addSand(cave, [x - 1, y + 1]);
    if (!cave[`${x + 1},${y + 1}`]) return addSand(cave, [x + 1, y + 1]);
    cave[`${x},${y}`] = "o";
    return true;
};

let rest = true;
while (rest) {
    rest = addSand(cave, [500, 0]);
}

console.log(Object.values(cave).filter((value) => value === "o").length);

const floor = bottom + 2;

const addSand2 = (cave, [x, y]) => {
    while (!cave[`${x},${y + 1}`] && y < floor - 1) {
        y++;
    }
    if (!cave[`${x - 1},${y + 1}`] && y < floor - 1)
        return addSand2(cave, [x - 1, y + 1]);
    if (!cave[`${x + 1},${y + 1}`] && y < floor - 1)
        return addSand2(cave, [x + 1, y + 1]);
    cave[`${x},${y}`] = "o";
    if (`${x},${y}` === "500,0") return false;
    return `${x},${y}`;
};

let stopped = true;
while (stopped) {
    stopped = addSand2(cave, [500, 0]);
}

console.log(Object.values(cave).filter((value) => value === "o").length);
