const fs = require("fs");
const path = require("path");

let data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => {
        const [id, winning, numbers] = row.split(":")
            .flatMap(part => part.split("|").map(str => str.trim()).map(numbers => numbers.split(" ").filter(item => item && item !== 'Card')));
        return {id: id[0], winning,numbers};
    });

const points = data.reduce((acc, card) => {
    return acc + card.numbers.reduce((acc, number) => {
        if (card.winning.includes(number)) {
            return acc * 2 || 1;
        }
        return acc;
    }, 0);
}, 0);

console.log(points);

const amounts = data.reduce((acc, card) => {
    const id = Number(card.id);
    acc[id] = acc[id] || 0;
    acc[id]++;

    const winnings = card.numbers.reduce((acc, number) => acc + card.winning.includes(number) * 1, 0);

    for (let i = 1; i <= winnings; i++) {
        const nextId = id + i;
        acc[nextId] = acc[nextId] || 0;
        acc[nextId] += acc[id];
    }

    return acc;
}, {});

console.log(Object.values(amounts).reduce((acc, cur) => acc + cur,0));