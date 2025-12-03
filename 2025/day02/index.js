const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .flatMap((el) => {
        const row = el.at(-1) === "," ? el.slice(0, -1) : el;
        return row.split(",").map(range => range.split("-").map(Number));
    });

const invalid = data.reduce((acc, [start, end]) => {
    const invalidIds = [];
    for (let i = start; i <= end; i++) {
        const string = String(i);
        if (string.length % 2 !== 0) continue;
        const index = string.length / 2;
        const [first, second] = [string.slice(0,index), string.slice(index)];
        if (first === second) invalidIds.push(Number(string));
    }
    return acc.concat(invalidIds);
}, []);

console.log(invalid.reduce((acc, cur) => acc + cur));

const part2 = data.reduce((acc, [start, end]) => {
    const invalidIds = [];
    for (let i = start; i <= end; i++) {
        const string = String(i);
        if (string.match(/^(.+)(\1)+$/)) invalidIds.push(Number(string));
    }
    return acc.concat(invalidIds);
}, []);

console.log(part2.reduce((acc, cur) => acc + cur));
