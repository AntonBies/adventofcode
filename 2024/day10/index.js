const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split("").map(Number));

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const trailheads = data.reduce((acc, row, y) => {
    return [
        ...acc,
        ...row.reduce((acc, loc, x) => {
            if (loc !== 0) return acc;
            return [...acc, [y, x].toString()];
        }, []),
    ];
}, []);

const findTrails = (grid, trailhead) => {
    const queue = [[trailhead]];
    const trails = [];

    while (queue.length) {
        const route = queue.shift();
        const [y, x] = route.at(-1).split(",").map(Number);
        const val = route.length - 1;

        if (val === 9) {
            trails.push(route);
            continue;
        }

        directions
            .map(([dy, dx]) => [y + dy, x + dx])
            .filter(([y, x]) => grid[y]?.[x] === val + 1)
            .forEach(([y, x]) => {
                const newRoute = route.concat([[y, x].toString()]);
                queue.push(newRoute);
            });
    }
    return trails;
};

const trails = trailheads.reduce((acc, trailhead) => {
    acc[trailhead] = findTrails(data, trailhead);
    return acc;
}, {});

const partone = () => {
    const scores = trailheads.map((trailhead) => {
        return trails[trailhead].reduce((acc, cur) => {
            acc.add(cur.at(-1));
            return acc;
        }, new Set()).size;
    });

    console.log(scores.reduce((acc, cur) => acc + cur));
};

const parttwo = () => {
    const ratings = trailheads.map((trailhead) => trails[trailhead].length);
    console.log(ratings.reduce((acc, cur) => acc + cur));
};

partone();
parttwo();
