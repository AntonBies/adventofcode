const fs = require("fs");
const path = require("path");

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const allDirections = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
];

const allocatedPlots = new Set();

const findRegion = (grid, loc) => {
    const queue = [loc];
    const region = {
        start: loc,
        type: (([y, x]) => grid[y][x])(loc.split(",")),
        plots: new Set([loc]),
        area: 0,
        perimeter: 0,
        corners: 0,
    };
    while (queue.length) {
        const cur = queue.shift();
        const [y, x] = cur.split(",").map(Number);
        allocatedPlots.add(cur);
        region.area++;
        region.perimeter += 4;

        const ADJ = allDirections.map(([dy, dx]) => [y + dy, x + dx]);
        const [N, NE, E, SE, S, SW, W, NW] = ADJ.map(
            ([y, x]) => grid[y]?.[x] === region.type
        );

        if (!N && !E) region.corners++;
        if (!E && !S) region.corners++;
        if (!S && !W) region.corners++;
        if (!W && !N) region.corners++;
        if (N && E && !NE) region.corners++;
        if (E && S && !SE) region.corners++;
        if (S && W && !SW) region.corners++;
        if (W && N && !NW) region.corners++;

        directions
            .map(([dy, dx]) => [y + dy, x + dx])
            .filter(([y, x]) => grid[y]?.[x] === region.type)
            .forEach(([y, x]) => {
                region.perimeter--;
                const nextLoc = [y, x].toString();
                if (!region.plots.has(nextLoc)) {
                    region.plots.add(nextLoc);
                    queue.push(nextLoc);
                }
            });
    }
    return region;
};

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split(""));

const regions = data.reduce((acc, row, y, grid) => {
    return {
        ...acc,
        ...row.reduce((acc, cur, x) => {
            const loc = [y, x].toString();
            if (allocatedPlots.has(loc)) return acc;
            const region = findRegion(grid, loc);
            acc[loc] = region;
            return acc;
        }, {}),
    };
}, {});

const partone = () => {
    return Object.values(regions).reduce(
        (acc, cur) => acc + cur.area * cur.perimeter,
        0
    );
};

const parttwo = () => {
    return Object.values(regions).reduce(
        (acc, cur) => acc + cur.area * cur.corners,
        0
    );
};

console.log(partone());
console.log(parttwo());
