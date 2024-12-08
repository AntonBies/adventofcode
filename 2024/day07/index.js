const fs = require("fs");
const path = require("path");

const data = fs
    .readFileSync(path.resolve(__dirname, "input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => {
        const [testValue, numbers] = row.split(":").map((part) => {
            if (part.indexOf(" ") > -1)
                return part.trim().split(" ").map(Number);
            return Number(part);
        });
        return { testValue, numbers };
    });

const operations = {
    "+": function (a, b) {
        return a + b;
    },
    "*": function (a, b) {
        return a * b;
    },
};

const partone = (input) => {
    return input.reduce((acc, cur) => {
        const results = cur.numbers.reduce((acc, cur, i) => {
            if (i === 0) {
                acc[0] = cur;
                return acc;
            }
            const entries = Object.entries(acc);
            entries.forEach(([key, value]) => {
                delete acc[key];
                const newKey = key === "0" ? "" : key;
                for (let sign in operations) {
                    acc[newKey + sign] = operations[sign](value, cur);
                }
            });
            return acc;
        }, {});
        const match = Object.values(results).find(
            (res) => res === cur.testValue
        );
        if (match) return acc + cur.testValue;
        return acc;
    }, 0);
};

const parttwo = (input) => {
    const ops = {
        ...operations,
        "||": function (a, b) {
            return Number(a.toString() + b);
        },
    };

    return input.reduce((acc, cur) => {
        const results = cur.numbers.reduce((acc, cur, i) => {
            if (i === 0) {
                acc[0] = cur;
                return acc;
            }
            const entries = Object.entries(acc);
            entries.forEach(([key, value]) => {
                delete acc[key];
                const newKey = key === "0" ? "" : key;
                for (let sign in ops) {
                    acc[newKey + sign] = ops[sign](value, cur);
                }
            });
            return acc;
        }, {});
        const match = Object.values(results).find(
            (res) => res === cur.testValue
        );
        if (match) return acc + cur.testValue;
        return acc;
    }, 0);
};

const partthree = (input) => {
    const ops = {
        ...operations,
        "||": function (a, b) {
            return Number(a.toString() + b);
        },
    };

    return input.reduce((acc, cur) => {
        const results = cur.numbers.reduce((acc, num, i) => {
            if (i === 0) {
                acc[0] = num;
                return acc;
            }
            const entries = Object.entries(acc);
            entries.forEach(([key, value]) => {
                delete acc[key];
                const newKey = key === "0" ? "" : key;
                for (let sign in ops) {
                    const res = ops[sign](value, num);
                    if (res <= cur.testValue) acc[newKey + sign] = res;
                }
            });
            return acc;
        }, {});
        const match = Object.values(results).find(
            (res) => res === cur.testValue
        );
        if (match) return acc + cur.testValue;
        return acc;
    }, 0);
};

console.log(partone(data));
console.log(parttwo(data));
