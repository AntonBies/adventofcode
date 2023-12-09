const fs = require("fs");
const path = require("path");

const reduceRow = (row) => {
    return row.reduce((acc, cur, i, arr) => {
        if (i === 0) return acc;
        return [...acc, cur - arr[i-1]];
    }, [])
};

const merge = ((obj1, obj2) => {
    for (const key in obj1) {
        obj2[key] += obj1[key];
    }
    return obj2;
})

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.trim().split(' ').map(Number));

const sums = data.reduce((acc, cur) => {
    const differences = [cur];
    while (differences[differences.length-1].some(n => n !== 0)) {
        const last = differences[differences.length-1];
        differences.push(reduceRow(last));
    }
    return merge(acc, differences.reduceRight((acc, cur) => {
        return {
            "next": acc["next"] + cur.at(-1),
            "prev": cur[0] - acc["prev"]
        }
    }, {"next": 0, "prev": 0}));
}, {"next": 0, "prev": 0});

console.log(sums);