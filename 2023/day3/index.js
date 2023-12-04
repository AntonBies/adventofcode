const fs = require("fs");
const path = require("path");

const ADJ = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1]
];

const data = fs
    .readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n")
    .map((row) => row.split(''));

const isSymbol = (char) => !!char && !char.match(/[\d.]/);

const isSymbolAdjacent = ([i,j]) => {
    return ADJ.map(([di, dj]) => [i + di, j + dj])
        .some(([i,j]) => isSymbol(data[i]?.[j]));
}

const isGearSymbolAdjacent = ([i,j]) => {
    return ADJ.map(([di, dj]) => [i + di, j + dj])
        .some(([i,j]) => data[i]?.[j]?.match(/\*/));
}

const getGearCoordinates = ([i,j]) => {
    return ADJ.map(([di, dj]) => [i + di, j + dj])
        .filter(([i,j]) => data[i]?.[j]?.match(/\*/))
        .map(([i,j]) => `${i}-${j}`);
}

const getNumberObj = ([i, j]) => {
    const numberArr = [];
    const coordinates = [];
    while (data[i]?.[j]?.match(/\d/)) {
        numberArr.push(data[i][j]);
        coordinates.push([i,j]);
        j++;
    }
    return {
        number: Number(numberArr.join('')),
        coordinates
    }
}

const getAllNumbers = (input) => {
    const rowLen = input[0].length;
    const colLen = input.length;
    const numbers = [];

    for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j< colLen; j++) {
            if (input[i][j].match(/\d/)) {
                const numberObj = getNumberObj([i,j]);
                numbers.push(numberObj);
                j = numberObj.coordinates.at(-1)[1];
            }
        }
    }
    return numbers;
}

const allNumbers = getAllNumbers(data);
const partNumbers = allNumbers.filter(({coordinates}) => coordinates.some(isSymbolAdjacent));
console.log(partNumbers.reduce((acc, {number}) => acc + number, 0));

const gearSymbolNumbers = partNumbers.filter(({coordinates}) => coordinates.some(isGearSymbolAdjacent));
const numbersWithGearCoordinates = gearSymbolNumbers.map(({number, coordinates}) => {
    const gearCoordinates = new Set(...(coordinates.map(getGearCoordinates).filter(arr => arr.length)));
    return {
        number,
        coordinates,
        gearCoordinates
    }
});
const gearCoordinates = numbersWithGearCoordinates.reduce((acc, cur) => {
    for (const coor of cur.gearCoordinates) {
        acc[coor] = acc[coor] || [];
        acc[coor].push(cur.number);
    }
    return acc;
}, {})

console.log(Object.values(gearCoordinates).reduce((acc, cur) => {
    if (cur.length === 2) return cur[0] * cur[1] + acc;
    return acc;
}, 0));