const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .map((row) => row.split(" ").join(""));

const map = {
    AX: 4,
    AY: 8,
    AZ: 3,
    BX: 1,
    BY: 5,
    BZ: 9,
    CX: 7,
    CY: 2,
    CZ: 6,
};

const map2 = {
    AX: 3,
    AY: 4,
    AZ: 8,
    BX: 1,
    BY: 5,
    BZ: 9,
    CX: 2,
    CY: 6,
    CZ: 7,
};

console.log(data.reduce((acc, cur) => acc + map[cur], 0));
console.log(data.reduce((acc, cur) => acc + map2[cur], 0));
