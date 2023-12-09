const fs = require("fs");
const path = require("path");
const puzzle = {};

const isFullyContained = (rangeA, rangeB) => {
    const [startA, lenA] = rangeA;
    const [outB, startB, lenB] = rangeB;
    
    return startA >= startB && startA + lenA <= startB + lenB;
}

const mapToNextCategory = (n, map) => {
    const range = map.find(([_, startIn, len]) => n >= startIn && n < startIn + len);
    if (!range) return n;
    return n - range[1] + range[0];
}

const mapRanges = (rangesArr, map) => {
    return rangesArr.reduce((acc, cur) => {
        const [start, len] = cur;
        const end = start + len - 1;

        if (end < map[0][1] || start >= map.at(-1)[1] + map.at(-1)[2]) return [...acc, cur];
        
        const containingRange = map.find(range => isFullyContained(cur, range));
        if (containingRange) return [...acc, [start + containingRange[0] - containingRange[1], len]];
        
        const returnRanges = [];

        
        console.log({start, end});
    }, []);
}

fs.readFileSync(path.resolve(__dirname,"input.txt"), { encoding: "utf-8" })
    .trim()
    .split("\n\n")
    .forEach((row, i) => {
        if (i === 0) {
            const [_, objName, numbers] = row.match(/(.*):\s([\d\s]+)$/);
            puzzle[objName] = numbers.trim().split(' ').map(Number);
        } else {
            const {groups: {from, to, mappings}} = row.match(/(?<from>[a-z]+)-to-(?<to>[a-z]+) map:\n(?<mappings>[\S\s]*)/)
            const objName = from + to.replace(/./, c => c.toUpperCase());
            puzzle[objName] = mappings.trim().split('\n').map(row => row.split(" ").map(Number)).sort((a,b) => a[1] - b[1]);
        }

    });

puzzle.seedRanges = puzzle.seeds.reduce((acc, cur, i, arr) => {
    if (i % 2 === 0) return acc;
    return [...acc, [arr[i-1], cur]];
}, []);

const seedLocation = Object.values(puzzle.seeds).map(seed => {
    const soil = mapToNextCategory(seed, puzzle.seedSoil);
    const fertilizer = mapToNextCategory(soil, puzzle.soilFertilizer);
    const water = mapToNextCategory(fertilizer, puzzle.fertilizerWater);
    const light = mapToNextCategory(water, puzzle.waterLight);
    const temperature = mapToNextCategory(light, puzzle.lightTemperature);
    const humidity = mapToNextCategory(temperature, puzzle.temperatureHumidity);
    const location = mapToNextCategory(humidity, puzzle.humidityLocation);
    return location;
});

const test1 = mapRanges([[1,2],[91,5]], [[20,10,9],[40,30,4]]);
const test2 = mapRanges([[7,5],[15,2]], [[30,10,2],[50,15,1]]);
const test3 = mapRanges(puzzle.seedRanges, puzzle.seedSoil);
console.log(Math.min(...seedLocation));



