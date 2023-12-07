const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((row) => {
        const [direction, steps] = row.split(" ");
        return [direction, Number(steps)];
    });

const start = `0,0`;
let hpos =
    (pos1 =
    pos2 =
    pos3 =
    pos4 =
    pos5 =
    pos6 =
    pos7 =
    pos8 =
    tpos =
        start);
const positionsT = {
    "0,0": 1,
};

const directionMap = {
    R: [0, 1],
    L: [0, -1],
    U: [-1, 0],
    D: [1, 0],
};

const moveMap = {
    "0,0": [0, 0],
    "-1,0": [0, 0],
    "1,0": [0, 0],
    "0,-1": [0, 0],
    "0,1": [0, 0],
    "-1,-1": [0, 0],
    "-1,1": [0, 0],
    "1,-1": [0, 0],
    "1,1": [0, 0],
    "2,0": [1, 0],
    "-2,0": [-1, 0],
    "0,2": [0, 1],
    "0,-2": [0, -1],
    "-2,1": [-1, 1],
    "-2,-1": [-1, -1],
    "2,1": [1, 1],
    "2,-1": [1, -1],
    "1,-2": [1, -1],
    "-1,-2": [-1, -1],
    "1,2": [1, 1],
    "-1,2": [-1, 1],
    "-2,2": [-1, 1],
    "-2,-2": [-1, -1],
    "2,2": [1, 1],
    "2,-2": [1, -1],
};

const addNewT = (tpos) => {
    positionsT[tpos] = positionsT[tpos] || 0;
    positionsT[tpos]++;
};

const destructurePos = (pos) => pos.split(",").map(Number);

const getNewH = (hpos, direction) => {
    const [y, x] = destructurePos(hpos);
    const [dy, dx] = directionMap[direction];
    return [y + dy, x + dx].join(",");
};

const getNewT = (hpos, tpos) => {
    const [y, x] = destructurePos(hpos);
    const [j, i] = destructurePos(tpos);
    const dy = y - j;
    const dx = x - i;
    const [dj, di] = moveMap[`${dy},${dx}`];
    return [j + dj, i + di].join(",");
};

/* PART 1
data.forEach(([direction, steps]) => {
    for (let i = 0; i < steps; i++) {
        hpos = getNewH(hpos, direction);
        const newTpos = getNewT(hpos, tpos);
        if (newTpos !== tpos) addNewT(newTpos);
        tpos = newTpos;
    }
});

console.log(Object.keys(positionsT).length);
*/

data.forEach(([direction, steps]) => {
    for (let i = 0; i < steps; i++) {
        hpos = getNewH(hpos, direction);
        pos1 = getNewT(hpos, pos1);
        pos2 = getNewT(pos1, pos2);
        pos3 = getNewT(pos2, pos3);
        pos4 = getNewT(pos3, pos4);
        pos5 = getNewT(pos4, pos5);
        pos6 = getNewT(pos5, pos6);
        pos7 = getNewT(pos6, pos7);
        pos8 = getNewT(pos7, pos8);
        const newTpos = getNewT(pos8, tpos);
        if (newTpos !== tpos) addNewT(newTpos);
        tpos = newTpos;
    }
});

console.log(Object.keys(positionsT).length);
