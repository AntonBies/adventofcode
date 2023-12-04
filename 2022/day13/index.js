const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n\n")
    .map((row) => {
        const [left, right] = row
            .split("\n")
            .filter(Boolean)
            .map((line) => JSON.parse(line));
        return { left, right };
    });

function isNumber(x) {
    return typeof x === "number";
}

function compare(left, right) {
    for (let i = 0; i < left.length; i++) {
        const l = left[i];
        const r = right[i];

        if (isNumber(l) && isNumber(r)) {
            if (l < r) return true;
            if (l > r) return false;
        }
        if (Array.isArray(l) && Array.isArray(r)) {
            const res = compare(l, r);
            if (typeof res === "boolean") return res;
        }
        if (isNumber(l) && Array.isArray(r)) {
            const res = compare([l], r);
            if (typeof res === "boolean") return res;
        }
        if (Array.isArray(l) && isNumber(r)) {
            const res = compare(l, [r]);
            if (typeof res === "boolean") return res;
        }
    }

    if (left.length < right.length) return true;
    if (left.length > right.length) return false;
}

const checksum = data.reduce((acc, cur, i) => {
    if (compare(cur.left, cur.right)) return acc + (i + 1);
    return acc;
}, 0);

console.log(checksum);

const input = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .replace(/\n\n/, "\n")
    .split("\n")
    .filter(Boolean)
    .map(JSON.parse);

input.push([[2]], [[6]]);

input.sort((a, b) => {
    const copyA = JSON.parse(JSON.stringify(a));
    const copyB = JSON.parse(JSON.stringify(b));
    const correctOrder = compare(copyA, copyB);
    return correctOrder ? -1 : 1;
});

const first = input.findIndex((item) => JSON.stringify(item) === "[[2]]") + 1;
const second = input.findIndex((item) => JSON.stringify(item) === "[[6]]") + 1;

console.log(first * second);
