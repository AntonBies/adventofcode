const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .reduce(
        (acc, cur) => {
            const [left, right] = cur.split("   ").map(Number);
            acc.left.push(left);
            acc.right.push(right);
            acc.count[right] = acc.count[right] || 0;
            acc.count[right]++;
            return acc;
        },
        { left: [], right: [], count: {} }
    );

const partone = function (input) {
    const left = input.left.toSorted();
    const right = input.right.toSorted();
    return left.reduce((acc, cur, i) => {
        return acc + Math.abs(cur - right[i]);
    }, 0);
};

const parttwo = function (input) {
    return input.left.reduce((acc, cur) => {
        return acc + cur * (input.count[cur] || 0);
    }, 0);
};

console.log(partone(data));
console.log(parttwo(data));
