const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((row) => {
        const len = row.length;
        const half = len / 2;
        const first = row.slice(0, half).split("");
        const second = row.slice(half).split("");
        return [first, second];
    });

const doubleItems = data.map(([first, second]) => {
    for (let item of first) {
        if (second.find((element) => item === element)) return item;
    }
});

const getScore = (arr) =>
    arr.reduce((acc, cur) => {
        const code = cur.charCodeAt(0);
        let value;
        if (code > 96) {
            value = code - 96;
        } else {
            value = code - 64 + 26;
        }
        return acc + value;
    }, 0);

console.log(getScore(doubleItems));

const newdata = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .match(/(?=[\s\S])(?:.*\n?){1,3}/g)
    .map((group) =>
        group
            .split("\n")
            .filter(Boolean)
            .map((row) => row.split(""))
    );

const badges = newdata.map((row) => {
    const badge = row.reduce((acc, cur) =>
        acc.filter((char) => cur.includes(char))
    );
    return badge[0];
});

console.log(getScore(badges));
