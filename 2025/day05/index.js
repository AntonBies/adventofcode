const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n\n")
    .reduce((acc, cur, i) => {
        if (i === 0) {
            acc.ranges = cur.split("\n").map(row => row.split("-").map(Number));
        } else {
            acc.ingredients = cur.split("\n").map(Number);
        }
        return acc;
    }, {});

data.ranges.sort(([a, ], [b, ]) => a - b);

const isFresh = (ingredient) => {
    return data.ranges.some(([low, high]) => ingredient >= low && ingredient <= high);
}

const amountFresh = data.ingredients.reduce((acc, cur) => {
    return acc + isFresh(cur);
},0);

console.log(amountFresh);

const combinedRanges = data.ranges.reduce((acc, [low, high]) => {
    if (!acc.length) return [[low, high]];
    const [prevLow, prevHigh] = acc.at(-1);
    if (low > prevHigh + 1) return [...acc, [low, high]];
    if (high <= prevHigh) return acc;
    const newAcc = acc.slice(0,-1);
    newAcc.push([prevLow, high]);
    return newAcc;
}, []);

console.log(combinedRanges.reduce((acc, [low, high]) => acc + high - low + 1,0));