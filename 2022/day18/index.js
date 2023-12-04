const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .trim()
    .split("\n")
    .reduce((acc, cur) => {
        const [x, y, z] = cur.split(",").map(Number);
        acc.add(`${x},${y},${z}`);
        return acc;
    }, new Set());

const countOpenSides = ([x, y, z]) => {
    let count = 6;
    if (data.has(`${x - 1},${y},${z}`)) count--;
    if (data.has(`${x + 1},${y},${z}`)) count--;
    if (data.has(`${x},${y - 1},${z}`)) count--;
    if (data.has(`${x},${y + 1},${z}`)) count--;
    if (data.has(`${x},${y},${z - 1}`)) count--;
    if (data.has(`${x},${y},${z + 1}`)) count--;
    return count;
};

function part1() {
    const area = [...data].reduce((acc, cur) => {
        const cube = cur.split(",").map(Number);
        return (acc += countOpenSides(cube));
    }, 0);
    console.log(area);
}

part1();
