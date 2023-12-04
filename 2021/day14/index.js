const fs = require('fs');

const data = fs
  .readFileSync('./adventofcode/day14/input.txt', { encoding: "utf-8" })
  .split('\n')
  .slice(1)
  .filter(Boolean)
  .map(item => {
    let [a,b] = item.split(' -> ');
    return [a,b]
  });

let polymer = 'PHVCVBFHCVPFKBNHKNBO';
let pairs = {};
let lettercount = {};

polymer = polymer.split('');
for (i = 0, len = polymer.length; i < len; i++) {
  lettercount[polymer[i]] = lettercount[polymer[i]] || 0;
  lettercount[polymer[i]] = lettercount[polymer[i]] + 1;
}

for (let i = 0, len = polymer.length -1; i < len; i++) {
  let pair = `${polymer[i]}${polymer[i+1]}`
  pairs[pair] = pairs[pair] || 0;
  pairs[pair] = pairs[pair] + 1;
}

const executeStep = (pairs) => {
  let newPairs = {};
  for (let pair in pairs) {
    if (pairs[pair] > 0) {
      const [first,second] = pair.split('');
      let mappingRow = data.find(item => item[0] === pair);
      const newPair1 = `${first}${mappingRow[1]}`;
      const newPair2 = `${mappingRow[1]}${second}`;
      newPairs[newPair1] = newPairs[newPair1] || 0;
      newPairs[newPair2] = newPairs[newPair2] || 0;
      newPairs[newPair1] = newPairs[newPair1] + pairs[pair];
      newPairs[newPair2] = newPairs[newPair2] + pairs[pair];
      lettercount[mappingRow[1]] = lettercount[mappingRow[1]] || 0;
      lettercount[mappingRow[1]] = lettercount[mappingRow[1]] + pairs[pair];
    }
  }
  return newPairs;
} 

for (let i = 0; i < 40; i++) {
  pairs = executeStep(pairs);
}

const sorter = [];
for (let i in lettercount) {
  sorter.push([i, lettercount[i]]);
}

sorter.sort((a, b) => b[1] - a[1]);
console.log(sorter[0][1] - sorter[sorter.length -1][1]);