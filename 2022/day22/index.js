const fs = require("fs");

const [board, path] = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n\n");

const data = {
    board: board.split("\n").map((row) => row.split("")),
    path: path.split("\n")[0].match(/(\d+)|([RL])/g),
    direction: "R",
};

data.location = {
    x: data.board[0].findIndex((item) => item === "."),
    y: 0,
};

const turn = (direction, letter) => {
    const directions = ["R", "D", "L", "U"];
    const current = directions.indexOf(direction);
    const next = letter === "R" ? current + 1 : current - 1;
    return directions.at(next % 4);
};

const directionMap = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, -1],
    D: [0, 1],
};

const getNextLocation = (loc, dx, dy, board, direction) => {
    let nx = loc.x + dx;
    let ny = loc.y + dy;
    if (board[ny]?.[nx] === ".") return { x: nx, y: ny };
    if (board[ny]?.[nx] === "#") return { x: loc.x, y: loc.y };
    if (direction === "R") {
        nx = board[ny].findIndex((cell) => cell === "." || cell === "#");
        return board[ny][nx] === "#"
            ? { x: loc.x, y: loc.y }
            : { x: nx, y: ny };
    }
    if (direction === "L") {
        nx = board[ny].findLastIndex((cell) => cell === "." || cell === "#");
        return board[ny][nx] === "#"
            ? { x: loc.x, y: loc.y }
            : { x: nx, y: ny };
    }
    if (direction === "D") {
        const column = board.map((row) => row[nx]);
        ny = column.findIndex((cell) => cell === "." || cell === "#");
        return board[ny][nx] === "#"
            ? { x: loc.x, y: loc.y }
            : { x: nx, y: ny };
    }
    if (direction === "U") {
        const column = board.map((row) => row[nx]);
        ny = column.findLastIndex((cell) => cell === "." || cell === "#");
        return board[ny][nx] === "#"
            ? { x: loc.x, y: loc.y }
            : { x: nx, y: ny };
    }
};

const move = (location, direction, steps, board) => {
    let { x, y } = location;
    const [dx, dy] = directionMap[direction];
    let nextLocation = { x, y };
    for (let i = 0; i < steps; i++) {
        const inputLocation = `${nextLocation.x},${nextLocation.y}`;
        nextLocation = getNextLocation(nextLocation, dx, dy, board, direction);
        if (`${nextLocation.x},${nextLocation.y}` === inputLocation) break;
    }
    return nextLocation;
};

for (const step of data.path) {
    const number = Number(step);
    if (isNaN(number)) {
        data.direction = turn(data.direction, step);
    } else {
        data.location = move(data.location, data.direction, number, data.board);
    }
}

const facingScore = {
    R: 0,
    D: 1,
    L: 2,
    U: 3,
};

const final =
    (data.location.y + 1) * 1000 +
    (data.location.x + 1) * 4 +
    facingScore[data.direction];

console.log(final);
