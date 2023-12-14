const fs = require("fs");
const path = require("path");

const transpose = (arr) => arr[0].map((_, x) => arr.map(row => row[x]));

const updateLine = (line) => {
    for (let i = 0; i < line.length; i++) {
        if (line[i] === ".") {
            for (let j = i; j < line.length; j++) {
                if (line[j] === "#") break;
                if (line[j] === "O") [line[i], line[j]] = [line[j], line[i]];
            }
        }  
    }
}

const tilt = (direction, arr) => {
    const newArr = [];
    if (direction === "N") {
        for (let x = 0; x < arr[0].length; x++) {
            const col = arr.map((row, y) => row[x]);
            updateLine(col);
            newArr.push(col);
        }
        return transpose(newArr);
    }
    if (direction === "W") {
        for (let y = 0; y < arr.length; y++) {
            const row = arr[y];
            updateLine(row);
            newArr.push(row);
        }
        return newArr;
    }
    if (direction === "S") {
        for (let x = 0; x < arr[0].length; x++) {
            const col = arr.map((row, y) => row[x]).toReversed();
            updateLine(col);
            newArr.push(col.toReversed());
        }
        return transpose(newArr);
    }
    if (direction === "E") {
        for (let y = 0; y < arr.length; y++) {
            const row = arr[y].toReversed();
            updateLine(row);
            newArr.push(row.toReversed());
        }
        return newArr;
    }
}

const cycle = (arr) => {
    return tilt("E", tilt("S", tilt("W", tilt("N", arr))));
}

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split(''));

const tiltedOnce = tilt("N", data);
const firstLoad = tiltedOnce.reduce((acc, cur, y, arr) => {
    const rows = arr.length;
    return acc + cur.reduce((acc, item) => acc + Number(item === "O") * (rows - y), 0);
}, 0);

console.log(firstLoad);

const map = new Map();
let i = 1, tilted = cycle(data), cycleSize = 0;
map.set(tilted.toString(), 1);
while(++i) {
    tilted = cycle(tilted);
    if (map.get(tilted.toString())) {
        cycleSize = i - map.get(tilted.toString());
        break;
    }
    map.set(tilted.toString(), i);
}
for (let j = 0; j < (1000000000 - i) % cycleSize; j++) {
    tilted = cycle(tilted);
}

const load = tilted.reduce((acc, cur, y, arr) => {
    const rows = arr.length;
    return acc + cur.reduce((acc, item) => acc + Number(item === "O") * (rows - y), 0);
}, 0);

console.log(load);