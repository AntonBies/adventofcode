const fs = require("fs");
const path = require("path");

const split = (val) => {
    const split = val.length / 2;
    return [val.slice(0, split), val.slice(split)]
        .map(Number)
        .map((num) => num.toString());
};

const calculateNext = (val) => {
    if (val === "0") return ["1"];
    if (val.length % 2 === 0) return split(val);
    return [(val * 2024).toString()];
};

const blink = (input) => {
    const list = Object.keys(input);
    const step = {};
    list.forEach((key) => {
        const count = input[key];
        const next = calculateNext(key);
        next.reduce((acc, cur) => {
            acc[cur] = acc[cur] || 0;
            acc[cur] += count;
            return acc;
        }, step);
    });
    return step;
};

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split(" ")
    .reduce((acc, cur) => {
        acc[cur] = acc[cur] || 0;
        acc[cur]++;
        return acc;
    }, {});

let line = { ...data };
for (let i = 0; i < 75; i++) {
    line = blink(line);
}

console.log(Object.values(line).reduce((acc, cur) => acc + cur));
