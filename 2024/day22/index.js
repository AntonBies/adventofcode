const fs = require("fs");
const path = require("path");

const pruneMod = BigInt(16777216);

const generateNext = (num) => {
    const a = (num ^ (num * BigInt(64))) % pruneMod;
    const b = (a ^ (a / BigInt(32))) % pruneMod;
    return (b ^ (b * BigInt(2048))) % pruneMod;
};

const getSecret = (num, amount) => {
    let current = num;
    for (let i = 0; i < amount; i++) {
        current = generateNext(current);
    }
    return current;
};
const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map(Number);

const partone = (input) => {
    return input.reduce((acc, cur) => {
        const num = BigInt(cur);
        return acc + getSecret(num, 2000);
    }, BigInt(0));
};

console.log(Number(partone(data)));
