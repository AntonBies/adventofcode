const fs = require("fs");
const path = require("path");

function cacheFn(fn) {
    const cache = {};
    return function(...args) {
        const key = args.toString();
        if (cache.hasOwnProperty(key)) return cache[key];
        cache[key] = fn.apply(this, args);
        return cache[key];
    }
}

const countValid = cacheFn(function([str, groups]) {
    if (str === "") return groups.length === 0 ? 1 : 0;
    if (groups.length === 0) return str.includes("#") ? 0 : 1;

    let result = 0;
    if ([".", "?"].includes(str[0])) {
        result += countValid([str.slice(1), [...groups]]);
    }
    if (["#", "?"].includes(str[0]) && groups[0] <= str.length && !str.slice(0,groups[0]).includes(".") && (groups[0] === str.length || str[groups[0]] !== "#")) {
        result += countValid([str.slice(groups[0] + 1), groups.slice(1)])
    }
    return result;
});

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((line) => {
        const [row, groups] = line.split(' ');
        return [row, groups.split(",").map(Number)];

    });

const actualData = data.map(arr => {
    const [row, groups] = arr;
    return [
        row.replace(/.+/, "$&?$&?$&?$&?$&"),
        groups.join().replace(/.+/, "$&,$&,$&,$&,$&").split(",").map(Number)
    ];
});

const validFolded = data.reduce((acc, cur) => acc + countValid(cur),0);
console.log(validFolded);

const validArrangements = actualData.reduce((acc, cur) => acc + countValid(cur),0);
console.log(validArrangements);