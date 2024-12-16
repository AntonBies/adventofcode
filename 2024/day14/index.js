const fs = require("fs");
const path = require("path");

const [cols, rows, seconds] = [101, 103, 100];
const [width, height] = [cols, rows].map((val) => Math.floor(val / 2));
const quadrants = [
    { start: [0, 0], end: [width - 1, height - 1] },
    {
        start: [cols - width, 0],
        end: [cols - 1, height - 1],
    },
    {
        start: [0, rows - height],
        end: [width - 1, rows - 1],
    },
    {
        start: [cols - width, rows - height],
        end: [cols - 1, rows - 1],
    },
];

const getPosition = ({ p, v }, s) => {
    const [x, y] = p.split(",").map(Number);
    const [dx, dy] = v.split(",").map(Number);
    const [nx, ny] = [
        (x + dx * s + cols * s) % cols,
        (y + dy * s + rows * s) % rows,
    ];

    const q = quadrants.findIndex(
        ({ start: [sx, sy], end: [ex, ey] }) =>
            nx >= sx && nx <= ex && ny >= sy && ny <= ey
    );

    return { p: [nx, ny].toString(), q };
};

const clusterScore = (grid, robots) => {
    const directions = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
    ];
    return robots.reduce((acc, { p }) => {
        const [x, y] = p.split(",").map(Number);
        return (
            acc +
            directions.filter(([dy, dx]) => grid[y + dy]?.[x + dx] === "#")
                .length
        );
    }, 0);
};

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => {
        const [_, p, v] = row.match(/p=(\d+,\d+)\sv=(.+)/);
        return { p, v };
    });

const partone = (input) => {
    const positions = input.map((robot) => getPosition(robot, seconds));
    const robotsPerQuadrant = positions.reduce((acc, cur) => {
        if (cur.q === -1) return acc;
        acc[cur.q] = acc[cur.q] || 0;
        acc[cur.q]++;
        return acc;
    }, {});
    console.log(
        Object.values(robotsPerQuadrant).reduce((acc, cur) => acc * cur, 1)
    );
};

const parttwo = (input) => {
    let maxCluster = 0;
    for (let i = 0; i < 15000; i++) {
        let positions = input.map((robot) => getPosition(robot, i));
        const grid = Array(rows)
            .fill(0)
            .map((row) => Array(cols).fill("."));
        positions.forEach(({ p }) => {
            const [x, y] = p.split(",").map(Number);
            grid[y][x] = "#";
        });
        const currentCluster = clusterScore(grid, positions);
        if (currentCluster >= maxCluster && currentCluster > 300) {
            console.log(currentCluster);
            console.log(
                grid.reduce((acc, cur) => acc + "\n" + cur.join(""), "")
            );
            console.log(i);
            maxCluster = currentCluster;
        }
    }
};

partone(data);
parttwo(data);
