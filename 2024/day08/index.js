const fs = require("fs");
const path = require("path");

let rows = 0,
    cols = 0;

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .reduce((obj, row, y) => {
        rows++;
        return {
            ...obj,
            ...row.split("").reduce((acc, loc, x) => {
                cols = cols || row.length;
                if (loc === ".") return acc;
                const key = [y, x].toString();
                acc[loc] = obj[loc] || acc[loc] || [];
                acc[loc].push(key);
                return acc;
            }, {}),
        };
    }, {});

const determineAntinodeLocations = (a, b) => {
    const [ay, ax] = a.split(",").map(Number);
    const [by, bx] = b.split(",").map(Number);
    const cy = 2 * ay - by,
        cx = 2 * ax - bx,
        dy = 2 * by - ay,
        dx = 2 * bx - ax;
    [
        [cy, cx],
        [dy, dx],
    ]
        .filter(([y, x]) => y > -1 && y < rows && x > -1 && x < rows)
        .forEach(([y, x]) => antinodes.add([y, x].toString()));
};

const handleList = (list) => {
    const [cur, ...rest] = list;
    if (rest.length === 0) return;
    rest.forEach((loc) => determineAntinodeLocations(cur, loc));
    handleList(rest);
};

const antinodes = new Set();

const partone = (input) => {
    const determineAntinodeLocations = (a, b) => {
        const [ay, ax] = a.split(",").map(Number);
        const [by, bx] = b.split(",").map(Number);
        const cy = 2 * ay - by,
            cx = 2 * ax - bx,
            dy = 2 * by - ay,
            dx = 2 * bx - ax;
        [
            [cy, cx],
            [dy, dx],
        ]
            .filter(([y, x]) => y > -1 && y < rows && x > -1 && x < rows)
            .forEach(([y, x]) => antinodes.add([y, x].toString()));
    };

    const lists = Object.values(input);
    lists.forEach(handleList);
    console.log(antinodes.size);
};

const parttwo = (input) => {
    const antinodes = new Set();

    const determineAntinodeLocations = (a, b) => {
        antinodes.add(a).add(b);
        const [ay, ax] = a.split(",").map(Number);
        const [by, bx] = b.split(",").map(Number);
        const day = ay - by,
            dax = ax - bx,
            dby = -day,
            dbx = -dax;
        let [ny, nx] = [ay + day, ax + dax];
        while (ny > -1 && ny < rows && nx > -1 && nx < cols) {
            antinodes.add([ny, nx].toString());
            [ny, nx] = [ny + day, nx + dax];
        }
        [ny, nx] = [by + dby, bx + dbx];
        while (ny > -1 && ny < rows && nx > -1 && nx < cols) {
            antinodes.add([ny, nx].toString());
            [ny, nx] = [ny + dby, nx + dbx];
        }
    };

    const handleList = (list) => {
        const [cur, ...rest] = list;
        if (rest.length === 0) return;
        rest.forEach((loc) => determineAntinodeLocations(cur, loc));
        handleList(rest);
    };

    const lists = Object.values(input);
    lists.forEach(handleList);
    console.log(antinodes.size);
};

partone(data);
parttwo(data);
