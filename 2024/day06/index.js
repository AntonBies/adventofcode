const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split(""));

const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
];

const startPosition = data.reduce((acc, row, y) => {
    const guardIndex = row.findIndex((pos) => pos === "^");
    if (guardIndex === -1) return acc;
    return [y, guardIndex];
}, []);

const partone = (grid) => {
    const visited = {
        [startPosition.toString()]: 1,
    };

    let pos = startPosition;
    let dir = 0;
    while (grid[pos[0]]?.[pos[1]]) {
        const [y, x] = pos;
        const [dy, dx] = directions[dir];
        const nextPos = [y + dy, x + dx];
        const nextStep = grid[y + dy]?.[x + dx];
        if (nextStep === "." || nextStep === "^") {
            pos = nextPos;
            const key = pos.toString();
            visited[key] = visited[key] || 0;
            visited[key]++;
        } else if (nextStep === "#") {
            dir = (dir + 1) % directions.length;
        } else if (!nextStep) {
            pos = nextPos;
        }
    }

    const visitedPositions = Object.keys(visited);
    console.log(visitedPositions.length);
    return visitedPositions;
};

const visitedPositions = partone(data);

const parttwo = (grid) => {
    const hasLoop = (newGrid) => {
        let pos = startPosition;
        let dir = 0;
        const visited = new Set();
        visited.add(`${startPosition},${dir}`);

        while (newGrid[pos[0]]?.[pos[1]]) {
            const [y, x] = pos;
            const [dy, dx] = directions[dir];
            const nextPos = [y + dy, x + dx];
            const nextStep = newGrid[y + dy]?.[x + dx];
            if (nextStep === "." || nextStep === "^") {
                pos = nextPos;
                const step = `${pos},${dir}`;
                if (visited.has(step)) return true;
                visited.add(step);
            } else if (nextStep === "#" || nextStep === "X") {
                dir = (dir + 1) % directions.length;
            } else if (!nextStep) {
                pos = nextPos;
            }
        }
        return false;
    };

    const obstacleLocations = visitedPositions.filter(
        (pos) => pos !== startPosition.toString()
    );
    return obstacleLocations.reduce((acc, cur) => {
        const [y, x] = cur.split(",");
        const newGrid = grid.map((row) => row.map((loc) => loc));
        newGrid[y][x] = "X";
        if (hasLoop(newGrid)) return acc + 1;
        return acc;
    }, 0);
};

console.log(parttwo(data));
