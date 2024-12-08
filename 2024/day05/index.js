const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n\n")
    .reduce((acc, block, i, arr) => {
        if (i === 0) {
            acc.rules = block.split("\n").reduce((acc, cur) => {
                const [a, b] = cur.split("|");
                acc[b] = acc[b] || new Set();
                acc[b].add(Number(a));
                return acc;
            }, {});
        } else {
            acc.updates = block
                .split("\n")
                .map((row) => row.split(",").map(Number));
        }
        return acc;
    }, {});

const isInCorrectOrder = (update, rules) => {
    for (let i in update) {
        const cur = update[i];
        const rest = update.slice(Number(i) + 1);
        const rulebreak =
            rest.length &&
            rest.some((page) => rules[cur] && rules[cur].has(page));
        if (rulebreak) return false;
    }
    return true;
};

const partone = (input) => {
    return input.updates.reduce((acc, cur) => {
        if (!isInCorrectOrder(cur, input.rules)) return acc;
        const middleIndex = Math.floor(cur.length / 2);
        return acc + cur[middleIndex];
    }, 0);
};

const parttwo = (input) => {
    return input.updates.reduce((acc, cur) => {
        if (isInCorrectOrder(cur, input.rules)) return acc;
        const sortedUpdate = cur.toSorted((a, b) => {
            if (input.rules[a] && input.rules[a].has(b)) return 1;
            if (input.rules[b] && input.rules[b].has(a)) return -1;
            return 0;
        });
        const middleIndex = Math.floor(cur.length / 2);
        return acc + sortedUpdate[middleIndex];
    }, 0);
};

console.log(partone(data));
console.log(parttwo(data));
