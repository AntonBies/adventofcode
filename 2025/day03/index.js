const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map(row => row.split('').map(Number));

const findHighest = (bank, start = 0) => {
    let max = 0;
    let i = 0;
    const len = bank.length;
    for (let j = start; j < len; j++) {
        const cur = bank[j];
        if (cur > max) {
            max = cur;
            i = j;
        } 
    }
    return { max, i}
}

const getJoltage = (bank, result, batteries) => {
    if (batteries === 0) return result;
    const len = bank.length;
    const i = len - batteries;
    const max = findHighest(bank.slice(0, i + 1));
    const rest = bank.slice(max.i + 1);
    return getJoltage(rest, [...result, max.max], batteries - 1);
}

const joltage = data.reduce((acc, cur) => {
    const len = cur.length;
    const max = findHighest(cur);
    if (max.i !== len - 1) {
        const second = findHighest(cur, max.i + 1);
        const jolts = max.max * 10 + second.max;
        return acc + jolts;
    }
    const first = findHighest([...cur].reverse(), 1);
    const jolts = first.max * 10 + max.max;
    return acc + jolts;
}, 0);

console.log(joltage);

const higherJoltage = data.reduce((acc, cur) => {
    const joltage = getJoltage(cur, [], 12);
    return acc + Number(joltage.join(""));
},0);

console.log(higherJoltage);