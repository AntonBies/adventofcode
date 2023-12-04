const fs = require("fs");

const [start, instructions] = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n\n");

const crates = start.split("\n").reverse();
const map = {};
crates[0]
    .split(/\s\s/)
    .map((item) => item.trim())
    .forEach((number) => {
        map[number] = [];
    });

convertRow = (string) =>
    string.length > 0
        ? [string.slice(0, 4), ...convertRow(string.slice(4))]
        : [];

crates.slice(1).forEach((row) => {
    const crates = convertRow(row);
    crates.forEach((crate, index) => {
        const data = crate.trim();
        if (data) map[`${index + 1}`].push(data);
    });
});

const procedure = instructions.split("\n").map((row) =>
    row
        .match(/.*(\s\d+\s).*(\d).*(\d).*/)
        .slice(1, 4)
        .map(Number)
);

/*
procedure.forEach(([amount, start, end]) => {
    for (let i = 0; i < amount; i++) {
        const crate = map[`${start}`].pop();
        map[`${end}`].push(crate);
    }
});
*/

procedure.forEach(([amount, start, end]) => {
    const from = map[`${start}`];
    const to = map[`${end}`];
    const startIndex = from.length - amount;
    const endIndex = from.length;
    const crates = from.slice(startIndex, endIndex);
    to.push(...crates);
    for (let i = 0; i < amount; i++) from.pop();
});

console.log(
    Object.values(map)
        .map((arr) => arr[arr.length - 1][1])
        .join("")
);
