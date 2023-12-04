const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((item) => ({ val: Number(item) }));

const decrypt = (input, rounds = 1) => {
    const acc = [...input];
    while (rounds--) {
        for (const obj of input) {
            const index = acc.indexOf(obj);
            acc.splice(index, 1);
            acc.splice((index + obj.val) % acc.length, 0, obj);
        }
    }
    const zero = acc.findIndex(({ val }) => val === 0);
    const numbers = [1000, 2000, 3000].map(
        (item) => acc[(item + zero) % acc.length]
    );
    return numbers.reduce((acc, cur) => acc + cur.val, 0);
};

function part1() {
    console.log(decrypt(data));
}

function part2() {
    const input = data.map((obj) => ({ val: obj.val * 811589153 }));
    console.log(decrypt(input, 10));
}

part1();
part2();
