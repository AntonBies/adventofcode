const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((row) => row.match(/(.+)\s(.+)\s(-?\d+)\sif\s(.*)\s(.*)\s(-?\d+)/));

const vars = {};
let maxValue = 0;

const calculator = {
    ">": function (a, b) {
        return a > b;
    },
    "<": function (a, b) {
        return a < b;
    },
    ">=": function (a, b) {
        return a >= b;
    },
    "==": function (a, b) {
        return a == b;
    },
    "!=": function (a, b) {
        return a != b;
    },
    "<=": function (a, b) {
        return a <= b;
    },
    inc: function (a, b) {
        return a + b;
    },
    dec: function (a, b) {
        return a - b;
    },
};

for (let instruction of data) {
    const [
        full,
        firstVar,
        firstAct,
        firstNum,
        secondVar,
        secondAct,
        secondNum,
    ] = instruction;
    vars[firstVar] = vars[firstVar] || 0;
    vars[secondVar] = vars[secondVar] || 0;
    if (calculator[secondAct](vars[secondVar], Number(secondNum))) {
        vars[firstVar] = calculator[firstAct](vars[firstVar], Number(firstNum));
        maxValue = Math.max(maxValue, vars[firstVar]);
    }
}

console.log(Object.values(vars).sort((a, b) => b - a)[0]);
console.log(maxValue);
