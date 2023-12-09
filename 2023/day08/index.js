const fs = require("fs");
const path = require("path");

function gcd(a,b) {
    if (a) return gcd(b % a, a);
    return b;
}

function lcm(a,b) {
    return a * b / gcd(a,b);
}

const input = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n\n")
    .reduce((acc, cur, i) => {
        if (i === 0) {
            acc.instr = cur;
            acc.step = 0;
            return acc;
        }
        const map = cur.split("\n").reduce((acc, cur) => {
            const [key, values] = cur.split(" = ").map(str => str.trim());
            const [L, R] = values.replace(/[()]/g, '').split(", ");
            return {...acc, [key]: {L,R}}
        }, {});
        
        return {...acc, map};
    }, {});

function partone(data) {
    let {instr, step, map} = JSON.parse(JSON.stringify(data));
    let cur = "AAA";
    while (cur != "ZZZ") {
        const i = step % instr.length;
        const to = instr[i];
        cur = map[cur][to];
        step++;
    }
    return step;
}

function parttwo(data) {
    let {instr, step, map} = JSON.parse(JSON.stringify(data));
    let cur = Object.keys(map).filter(node => node.endsWith("A"));
    const answ = [];
    while (cur.some(node => isNaN(node) && !node.endsWith("Z"))) {
        const i = step % instr.length;
        const to = instr[i];
        cur = cur.map(item => {
            if (!isNaN(item)) return item;
            const next = map[item][to];
            if (next.endsWith("Z")) return step + 1;
            return next;
        });
        step++;
    }
    return cur.reduce((acc, cur) => lcm(acc, cur), 1)
}

console.log(partone(input));
console.log(parttwo(input));