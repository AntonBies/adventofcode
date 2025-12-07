const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map(row => row.trim().split(/\s+/).map(el => {
        if (isNaN(el)) return el;
        return Number(el);
    }));

const transposed = data[0].map((_, x) => data.map(row => row[x]));

const operations = {
    "*": function(a, b) { return a * b },
    "+": function(a, b) { return a + b },
}

const calculate = (row) => {
    const numbers = row.slice(0, -1);
    const operation = operations[row.at(-1)];
    return numbers.reduce((acc, cur) => operation(acc, cur));
}

console.log(transposed.reduce((acc, cur) => acc + calculate(cur),0));

const part2 = () => {
    const rows = fs
        .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
        .split("\n")
        .map(row => row + ' ');

    const width = rows.at(-1).match(/[^\s]\s+/g).map(str => str.length);
    const data = rows.map((row) => {
        let str = row;
        return width.map(len => {
            const item = str.slice(0, len);
            str = str.slice(len);
            return item;
        })
    })

    const transposed = data[0].map((_, x) => data.map(row => row[x]));

    const input = transposed.map((row) => {
        const numbersInput = row.slice(0,-1);
        const operation = operations[row.at(-1).trim()];
        const numbers = [];
        for (let i = numbersInput[0].length -2; i >= 0; i--) {
            numbers.push(numbersInput.map((str) => str[i]).join('').replace(/\s/g, ''));
        }
        return { numbers: numbers.map(Number), operation}
    });

    console.log(input.reduce((acc, {numbers, operation}) => {
        return acc + numbers.reduce((acc, cur) => {
            return operation(acc, cur);
        });    
    }, 0));
}

part2();