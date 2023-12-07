const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n\n")
    .map((elf) => elf.split("\n").filter(Boolean).map(Number));

const calPerElf = data.map((item) => item.reduce((prev, cur) => prev + cur), 0);
calPerElf.sort((a, b) => b - a);

console.log(calPerElf[0]);

console.log(calPerElf.slice(0, 3).reduce((a, b) => a + b));
