const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .trim()
    .split("\n")
    .reduce((obj, monkey) => {
        const [name, rest] = monkey.split(": ");
        const number = Number(rest);
        const calculation = !isNaN(number) ? number : rest.split(" ");
        obj[name] = calculation;
        return obj;
    }, {});

const operators = {
    "+": function (a, b) {
        return a + b;
    },
    "-": function (a, b) {
        return a - b;
    },
    "*": function (a, b) {
        return a * b;
    },
    "/": function (a, b) {
        return a / b;
    },
};

const getNumber = (obj, monkey) => {
    if (!Array.isArray(obj[monkey])) return obj[monkey];
    const [first, sign, second] = obj[monkey];
    const fn = operators[sign];
    const firstNumber = getNumber(obj, first);
    const secondNumber = getNumber(obj, second);
    return fn(firstNumber, secondNumber);
};

function part1() {
    console.log(getNumber(data, "root"));
}

part1();
