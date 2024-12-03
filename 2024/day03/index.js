const fs = require("fs");
const path = require("path");

const multiply = (a, b) => a * b;

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .match(/mul\(\d{1,3},\d{1,3}\)|do(n't)?\(\)/g);

const partone = (input) => {
    return input.reduce((acc, cur) => {
        if (cur.includes("()")) return acc;
        const [a, b] = cur.match(/\d{1,3}/g).map(Number);
        return acc + multiply(a, b);
    }, 0);
};

const parttwo = (input) => {
    return input.reduce(
        (acc, cur) => {
            if (cur.includes("()")) {
                acc.do = cur === "do()";
                return acc;
            }
            if (!acc.do) return acc;
            const [a, b] = cur.match(/\d{1,3}/g).map(Number);
            acc.sum += multiply(a, b);
            return acc;
        },
        { do: true, sum: 0 }
    ).sum;
};

console.log(partone(data));
console.log(parttwo(data));
