const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n\n");

const patterns = data[0].split(", ");
const possiblePatterns = new Set(patterns);
const matches = {};
const designs = data[1].split("\n");

const findDesign = (string, matched = "") => {
    const len = string.length;
    if (matched) possiblePatterns.add(matched);
    if (possiblePatterns.has(string)) {
        matches[matched + string] = matches[matched + string] || 0;
        matches[matched + string]++;
    }
    for (let i = len - 1; i > 0; i--) {
        const [a, b] = [string.slice(0, i), string.slice(i)];
        if (patterns.indexOf(a) > -1) findDesign(b, matched + a);
    }
};

designs.forEach((design) => findDesign(design));
console.log(matches);
