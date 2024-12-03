const fs = require("fs");
const path = require("path");
const { rootCertificates } = require("tls");

const compareFns = {
    "<": function(a,b) { return a < b },
    ">": function(a,b) { return a > b }   
}

function performCheck(part, check) {
    const [input,letter, compare, number] = check.match(/([xmas])([<>])(\d+)/);
    const n = Number(number);
    
    return compareFns[compare](part[letter], n)
}

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n\n")
    .map(block => block.split("\n"));

const rules = data[0].reduce((acc, cur) => {
    const ruleStart = cur.indexOf("{");
    const name = cur.slice(0, ruleStart);
    const rules = cur.slice(ruleStart + 1, -1).split(',').map(str => {
        const rOrA = ["R", "A"].indexOf(str);
        if (rOrA > -1) return rOrA;

        if (str.indexOf(":") === -1) return str;

        const [check, next] = str.split(":");
        return function(part) {
            if (performCheck(part, check)) {
                const rOrA = ["R", "A"].indexOf(next);
                return rOrA > -1 ? rOrA : next;
            }
        }
    });

    acc[name] = rules;
    return acc;
}, {});

const parts = data[1].map(str => {
    const arr = str.slice(1,-1).split(",");
    const obj = {};
    for (let item of arr) {
        const [key, val] = item.split("=");
        obj[key] = Number(val);
    }
    return obj;
})

const rating = parts.reduce((acc, cur) => {
    let ruleName = 'in';
    let rOrA = -1;
    while (![0,1].includes(rOrA)) {
        for (let rule of rules[ruleName]) {
            rOrA = typeof rule === "function" ? rule(cur) : rule;
            if (typeof rOrA === "number") break;
            if (typeof rOrA === "string") {
                ruleName = rOrA;
                break;
            }
        }
    }
    return rOrA === 0 ? acc : acc + Object.values(cur).reduce((acc, cur) => acc + cur);
}, 0);

console.log("end");