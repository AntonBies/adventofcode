const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split(" ").map(Number));

const isSafe = (report) => {
    const deltas = report.slice(1).map((val, i) => val - report[i]);
    if (
        deltas.some((val) => val === 0 || Math.abs(val) > 3) ||
        (deltas.some((val) => val < 0) && deltas.some((val) => val > 0))
    )
        return false;
    return true;
};

const removeOne = (report) => {
    for (let i in report) {
        const edited = report.toSpliced(i, 1);
        if (isSafe(edited)) return true;
    }
    return false;
};

const partone = (input) => {
    return input.reduce((acc, cur) => {
        if (!isSafe(cur)) return acc;
        return acc + 1;
    }, 0);
};

const parttwo = (input) => {
    const reports = input.reduce((acc, cur, i) => {
        acc[i] = isSafe(cur);
        return acc;
    }, {});

    for (let key in reports) {
        if (reports[key]) continue;
        if (removeOne(input[key])) reports[key] = true;
    }

    console.log(Object.values(reports).filter(Boolean).length);
};

console.log(partone(data));
parttwo(data);
