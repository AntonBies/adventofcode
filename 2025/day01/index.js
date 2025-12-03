const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map(el => {
        const [_, dir, amount] = el.match(/(L|R)(\d+)/);
        return { dir, amount: Number(amount)};
    });

const [startIndex, lowest, highest] = [50, 0, 99];
const password = data.reduce((acc, cur, i) => {
    const passes = Math.floor(cur.amount / 100);
    acc.count += passes;
    const amount = cur.amount - passes * 100;
    const step = cur.dir === 'L' ? (acc.index - amount) : (acc.index + amount);
    const next = step % 100;
    const nextIndex = next >= 0 ? next : 100 + next;
    if (step !== next || (next < 0 && acc.index !== 0) || nextIndex === 0) acc.count++;
    return {index: nextIndex, count: acc.count};
}, {index: startIndex, count: 0});

console.log(password);