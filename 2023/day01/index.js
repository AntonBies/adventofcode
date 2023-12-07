const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .reduce((acc, cur) => {
        const digits = cur.replace(/[^\d]/g, '')
        return acc + parseInt(digits[0] + digits.slice(-1));
    }, 0);

console.log(partone);

const parttwo = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .reduce((acc, cur) => {
        const map = {
            one: '1',
            two: '2',
            three: '3',
            four: '4',
            five: '5',
            six: '6',
            seven: '7',
            eight: '8',
            nine: '9',
        }
        const first = cur.match(/\d|one|two|three|four|five|six|seven|eight|nine/)
        const last = cur.match(/(?:.*)(\d|one|two|three|four|five|six|seven|eight|nine)/)[1];
        const firstDigit = map[first] || first;
        const lastDigit = map[last] || last;
        return acc + parseInt(firstDigit + lastDigit);
    }, 0);

console.log(parttwo);