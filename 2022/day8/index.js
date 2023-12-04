const fs = require("fs");

const data = fs
    .readFileSync("input.txt", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((item) => item.split("").map(Number));

const xlen = data[0].length;
const ylen = data.length;

const getLeft = (x, y, arr) => arr[y].slice(0, x);
const getRight = (x, y, arr) => arr[y].slice(x + 1, xlen);
const getTop = (x, y, arr) =>
    arr
        .map((row, j) => row.find((item, i) => i === x && j < y))
        .filter((res) => res !== undefined);
const getBottom = (x, y, arr) =>
    arr
        .map((row, j) => row.find((item, i) => i === x && j > y))
        .filter((res) => res !== undefined);

const isVisible = (tree, x, y, arr) => {
    const itemIsSmallerThanTree = (item) => item < tree;

    if (x === 0 || y === 0 || x === xlen - 1 || y === ylen - 1) return true;

    const toTheLeft = getLeft(x, y, arr);
    if (toTheLeft.every(itemIsSmallerThanTree)) return true;

    const toTheRight = getRight(x, y, arr);
    if (toTheRight.every(itemIsSmallerThanTree)) return true;

    const toTheTop = getTop(x, y, arr);
    if (toTheTop.every(itemIsSmallerThanTree)) return true;

    const toTheBottom = getBottom(x, y, arr);
    if (toTheBottom.every(itemIsSmallerThanTree)) return true;

    return false;
};

const visibleTrees = data.map((row, y) =>
    row.map((tree, x) => isVisible(tree, x, y, data))
);

console.log(
    visibleTrees.reduce(
        (acc, cur) =>
            acc +
            cur.reduce((a, b) => {
                return !b ? a : a + b;
            }, 0),
        0
    )
);

const canSee = (tree, arr, i = 0, amount = 0) => {
    if (i === arr.length - 1 || tree <= arr[i]) return amount + 1;
    return canSee(tree, arr, i + 1, amount + 1);
};

const getScenicScore = (tree, x, y, arr) => {
    if (x === 0 || y === 0 || x === xlen - 1 || y === ylen - 1) return 0;
    const toTheLeft = getLeft(x, y, arr).reverse();
    const seeToTheLeft = canSee(tree, toTheLeft);
    const toTheRight = getRight(x, y, arr);
    const seeToTheRight = canSee(tree, toTheRight);
    const toTheTop = getTop(x, y, arr).reverse();
    const seeToTheTop = canSee(tree, toTheTop);
    const toTheBottom = getBottom(x, y, arr);
    const seeToTheBottom = canSee(tree, toTheBottom);
    return seeToTheLeft * seeToTheRight * seeToTheTop * seeToTheBottom;
};

const scenicScores = data.map((row, y) =>
    row.map((tree, x) => getScenicScore(tree, x, y, data))
);

const maxScenicScore = scenicScores.reduce((max, currentRow) => {
    const currentMax = Math.max(...currentRow);
    return currentMax > max ? currentMax : max;
}, 0);

console.log(maxScenicScore);
